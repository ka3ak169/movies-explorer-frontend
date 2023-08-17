import { useState, useEffect} from 'react';
import {
  Route,
  Routes,
  useNavigate,
  useLocation
} from "react-router-dom";
import Header from "./Header/Header";
import Main  from "./Main/Main";
import Movies  from "./Movies/Movies";
import Footer from './Footer/Footer';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';
import Register from './Register/Register';
import Login from './Login/Login';
import NotFound from './NotFound/NotFound';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { LoggedInContext } from "../contexts/LoggedInContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { register, authorization, authorize } from "../utils/Auth";
import { getUserInformation, changeUserInformation } from "../utils/MainApi";
import { getAllFilms } from "../utils/MoviesApi";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registration, setRegistration] = useState(false);
  const [changeInformation, setChangeInformation] = useState(false);
  const [lastVisitedPage, setLastVisitedPage] = useState("/");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLastVisitedPage(location.pathname);
  }, [location]);

  // Сохранение в localStorage
  useEffect(() => {
    if (location.pathname !== lastVisitedPage) {
      localStorage.setItem("lastVisitedPage", location.pathname);
    }
  }, [location, lastVisitedPage]);  

  // Извлечение при загрузке
  useEffect(() => {
    const storedPage = localStorage.getItem("lastVisitedPage");
    if (storedPage) {
      setLastVisitedPage(storedPage);
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/movies"; // Получение последней посещенной страницы
        if (storedToken) {
          const token = JSON.parse(storedToken);
          await tokenCheck(token);
          setLoggedIn(true);
          navigate(lastVisitedPage); // Перенаправление на последнюю посещенную страницу
        }
        if (loggedIn) {
          const userData = await getUserInformation();
          await setCurrentUser(userData.data);
        //   const [userData, cards] = await Promise.all([
        //     api.getUserInformation(),
        //     api.getInitialCards(),
        //   ]);
        //   setCards(cards.map((item) => item));
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [loggedIn]);
  

  const tokenCheck = async (token) => {
    try {
      const result = await authorize(token);
      if (result !== null && result.data !== null) {
        // console.log(result.data);
        // console.log(currentUser);
        setLoggedIn(true);
        // api.setToken(token); НЕ ПОНЯТНО ЗАЧЕМ НУЖНО
      }
    } catch (error) {
      console.log("Токена не существует");
    }
  };

  const closeAllPopups = () => {
    setIsInfoTooltipPopupOpen(false);
  };

  const handleRegisterSubmit = (name, email, password) => {
    // console.log(name, email, password);
    register(name, email, password)
      .then((result) => {
        // console.log(result);
        setRegistration(true);
        setIsInfoTooltipPopupOpen(true);
        setTimeout(() => {
          navigate("/signup");
          closeAllPopups();
        }, 2000);
      })
      .catch((error) => {
        // Обработка ошибки
        console.log(error);
        setRegistration(false);
        setIsInfoTooltipPopupOpen(true);
        setTimeout(() => {
          closeAllPopups();
        }, 2000);
      });
  };
  
  const handleLoginSubmit = (email, password) => {
    // console.log(email, password);
    authorization(email, password)
      .then((result) => {
        // console.log(result);
        localStorage.setItem("token", JSON.stringify(result.token));
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((error) => {
        // Обработка ошибки
        console.log(error);
        setIsInfoTooltipPopupOpen(true);
        setRegistration(false);
        setTimeout(() => {
          closeAllPopups();
        }, 2000);
      });
  };

  const updateUserInformation = (data) => {
    changeUserInformation(data)
    .then((result) => {
      console.log(result);
      setRegistration(true);
      setChangeInformation(true);
      setIsInfoTooltipPopupOpen(true);
      setCurrentUser(data);
      setTimeout(() => {        
        closeAllPopups();        
      }, 2000);
      setTimeout(() => {
        setChangeInformation(false);
      }, 3000)
    })
    .catch((error) => {
      // Обработка ошибки
      console.log(error);
      setRegistration(false);
      setIsInfoTooltipPopupOpen(true);
      setTimeout(() => {
        closeAllPopups();
      }, 2000);
    });
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastVisitedPage");
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/");
  };

  const getInitialFilms = () => {    
    getAllFilms()
    .then((result) => {
      console.log(result);
      
    })
    .catch((error) => {
      // Обработка ошибки
      console.log(error);
      
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    location={"home"}
                  />
                  <Main/>
                  <Footer/>
                </>
              }
            />
            <Route
              path="/movies"
              element={
                <>
                  <Header
                    location={"main"}
                  />
                  <ProtectedRoute
                    // loggedIn={loggedIn}
                    element={Movies}
                    onGetFilms={getInitialFilms}
                    // onAddPlace={handleAddPlaceClick}
                    // onEditAvatar={handleEditAvatarClick}
                    // onCardClick={handleCardClick}
                    // onCardLike={handleCardLike}
                    // onCardDelete={handleCardDelete}
                    // cards={cards}
                  />
                  <Footer/>
                </>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <>
                  <Header location={"main"}/>
                  <ProtectedRoute
                    element={SavedMovies}
                    location={"saved"}
                  />
                  <Footer/>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header  location={"main"}/>
                  <ProtectedRoute
                    element={Profile}
                    onChangeInformation={updateUserInformation}
                    onLogout={handleLogout}
                  />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Register
                    onSubmit={handleRegisterSubmit}
                  />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Login
                    onSubmit={handleLoginSubmit}
                  />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <NotFound/>
                </>
              }
            />
          </Routes>
          <InfoTooltip
                registration={registration}
                changeInformation={changeInformation}
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
              />
        </div>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
