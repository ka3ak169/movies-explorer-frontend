import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import Footer from "./Footer/Footer";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile/Profile";
import Register from "./Register/Register";
import Login from "./Login/Login";
import NotFound from "./NotFound/NotFound";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { LoggedInContext } from "../contexts/LoggedInContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { register, authorization, authorize } from "../utils/Auth";
import {
  getUserInformation,
  changeUserInformation,
  postFavoriteMovies,
  deleteFavoriteMovies,
  getInitialFilms,
} from "../utils/MainApi";
import { getAllFilms } from "../utils/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false); // попап регистрации
  const [loggedIn, setLoggedIn] = useState(false);
  const [registration, setRegistration] = useState(false); //состояние попапа
  const [changeInformation, setChangeInformation] = useState(false); //состояние попапа
  const [lastVisitedPage, setLastVisitedPage] = useState("/");
  const [films, setFilms] = useState([]); //массив который отрендерится
  const [allFilms, setAllFilms] = useState([]); //массив с сервера после фильтра запроса
  const [savedFilms, setSavedFilms] = useState([]); //массив сохраненных фильмов
  const [filteredSavedFilms, setFilteredSavedFilms] = useState([]); // отфильтрованные сохраненные
  const [filmsToRender, setFilmsToRender] = useState([]); //массив фильмов для длинны и работы с ним до рендера
  const [searching, setSearching] = useState(false); //обозначает факт поиска
  const [nomatches, setNomatches] = useState(false); //состояние прелоадера
  const [isLoading, setIsLoading] = useState(false); //состояние прелоадера
  const [searchError, setSearchError] = useState(false); //состояние прелоадера
  const [isChecked, setIsChecked] = useState(false); // состояние ползунка короткометражек
  const [preloaderHidden, setPreloaderHidden] = useState(false); //состояние кнопки прелоадера
  const [rowsToShow, setRowsToShow] = useState(getDefaultRows()); // количество карточек

  const navigate = useNavigate();
  const location = useLocation();
  //количество карточек
  function getDefaultRows() {
    const width = window.innerWidth;
    if (width >= 1280) return 16;
    if (width >= 930) return 12;
    if (width >= 750) return 8;
    return 5;
  }

  const getInintialSavedFilms = () => {
    getInitialFilms()
      .then((result) => {
        setSavedFilms(result);
      })
      .catch((error) => {
        // Обработка ошибки
        console.log(error);
      });
  };

  useEffect(() => {
    // Функция, которая будет вызываться при изменении размера окна
    function handleResize() {
      const newRowsToShow = getDefaultRows();
      setRowsToShow(newRowsToShow);
    }

    // Добавляем слушатель события resize
    window.addEventListener("resize", handleResize);

    // Удаляем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // управляет кнопкой прелоадера
  useEffect(() => {
    if (filmsToRender.length > rowsToShow) {
      setPreloaderHidden(true);
    }
  }, [filmsToRender, rowsToShow, preloaderHidden]);

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
    getInintialSavedFilms();
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token"); //получение токена
        const lastVisitedPage =
          localStorage.getItem("lastVisitedPage") || "/movies"; // Получение последней посещенной страницы
        const lastSearchText = localStorage.getItem("lastSearchText"); // получение последнего запроса для отрисовки при загрузке
        if (storedToken) {
          const token = JSON.parse(storedToken);
          await tokenCheck(token);
          setLoggedIn(true);

          navigate(lastVisitedPage); // Перенаправление на последнюю посещенную страницу
        }
        if (loggedIn) {
          const userData = await getUserInformation();
          setCurrentUser(userData.data);
        }
        if (lastSearchText) {
          setIsLoading(true);
          getSearchFilms(lastSearchText);
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
        setLoggedIn(true);
      }
    } catch (error) {
      console.log("Токена не существует");
    }
  };

  const closeAllPopups = () => {
    setIsInfoTooltipPopupOpen(false);
  };

  const handlePreloaderButton = () => {
    const width = window.innerWidth;

    if (width < 930 && filmsToRender.length > rowsToShow) {
      setRowsToShow(rowsToShow + 2);
    } else if (width < 1280 && filmsToRender.length > rowsToShow) {
      setRowsToShow(rowsToShow + 3);
    } else if (width >= 1280 && filmsToRender.length > rowsToShow) {
      setRowsToShow(rowsToShow + 4);
    }

    // Проверяем, достигло ли значение rowsToShow необходимого порога
    if (rowsToShow + 4 >= filmsToRender.length) {
      setPreloaderHidden(false);
    }
  };

  const handleRegisterSubmit = (name, email, password) => {
    register(name, email, password)
      .then((result) => {
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
    authorization(email, password)
      .then((result) => {
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
        setRegistration(true);
        setChangeInformation(true);
        setIsInfoTooltipPopupOpen(true);
        setCurrentUser(data);
        setTimeout(() => {
          closeAllPopups();
        }, 2000);
        setTimeout(() => {
          setChangeInformation(false);
        }, 3000);
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

  const addFavoriteMovies = (film, owner) => {
    postFavoriteMovies(film, owner)
      .then((result) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastVisitedPage");
    localStorage.removeItem("lastSearchText");
    setCurrentUser({});
    setLoggedIn(false);
    setFilteredSavedFilms([]);
    setAllFilms([]);
    setSavedFilms([]);
    setFilmsToRender([]);
    setIsChecked(false);
    setFilms([]);
    navigate("/");
  };

  //отрисовка фильмов
  const renderFilms = (films, isChecked) => {
    const filmsToRender = isChecked
      ? films
      : films.filter((film) => film.duration > 52);
    setFilmsToRender(filmsToRender);
    setFilms(filmsToRender.slice(0, rowsToShow));
  };

  const filterSavedFilms = (films, isShort) => {
    return isShort ? films : films.filter((f) => f.duration > 52);
  };

  useEffect(() => {
    const filtered = filterSavedFilms(savedFilms, isChecked);
    setFilteredSavedFilms(filtered);
  }, [savedFilms, isChecked, loggedIn]);

  useEffect(() => {
    // Эта функция будет вызвана, когда allFilms или isChecked изменятся
    const renderFilms = () => {
      const filmsToRender = isChecked
        ? allFilms
        : allFilms.filter((film) => film.duration > 52);
      setFilms(filmsToRender.slice(0, rowsToShow));
    };

    renderFilms(); // Вызываем функцию рендеринга сразу, чтобы отобразить фильмы
  }, [allFilms, isChecked, rowsToShow, loggedIn, savedFilms]);

  const filterFilms = (films, searchText) => {
    return films.filter(
      (film) =>
        (film.description &&
          film.description.toLowerCase().includes(searchText)) ||
        (film.nameRU && film.nameRU.toLowerCase().includes(searchText)) ||
        (film.nameEN && film.nameEN.toLowerCase().includes(searchText)) ||
        (film.director && film.director.toLowerCase().includes(searchText)) ||
        (film.country && film.country.toLowerCase().includes(searchText)) ||
        (film.year && film.year.toString().includes(searchText))
    );
  };
  // логика по нажатию на поиск
  const getSearchFilms = (text) => {
    setFilms([]);
    setIsLoading(true);
    // Установка таймаута в 20 секунд
    const timeoutId = setTimeout(() => {
      console.log("Поиск занимает слишком много времени!");
      setSearchError(true);
    }, 20000);
    getAllFilms()
      .then((result) => {
        clearTimeout(timeoutId);
        localStorage.setItem("lastSearchText", text);
        setIsLoading(false);
        setSearching(true);
        const searchText = text.toLowerCase();
        const filteredFilms = filterFilms(result, searchText);
        setAllFilms(filteredFilms);
        if (filteredFilms.length === 0) {
          setNomatches(true);
          setFilms([]);
          console.log("ничего не нашел");
        } else {
          setNomatches(false);
          renderFilms(filteredFilms, isChecked);
        }
      })
      .catch((error) => {
        // Обработка ошибки
        clearTimeout(timeoutId);
        console.log(error);
        setSearchError(true);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header location={"home"} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path="/movies"
              element={
                <>
                  <Header location={"main"} />
                  <ProtectedRoute
                    element={Movies}
                    onGetFilms={getSearchFilms}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    searchError={searchError}
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                    rowsToShow={rowsToShow}
                    nomatches={nomatches}
                    searching={searching}
                    films={films}
                    filmsToRender={filmsToRender}
                    preloaderHidden={preloaderHidden}
                    onPreloader={handlePreloaderButton}
                    onAddFilm={addFavoriteMovies}
                    onDelFilm={deleteFavoriteMovies}
                    savedFilms={filteredSavedFilms}
                    onInitialFilm={getInintialSavedFilms}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <>
                  <Header location={"main"} />
                  <ProtectedRoute
                    element={SavedMovies}
                    location={"saved"}
                    onGetFilms={getSearchFilms}
                    setIsLoading={setIsLoading}
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                    savedFilms={filteredSavedFilms}
                    onDelFilm={deleteFavoriteMovies}
                    onInitialFilm={getInintialSavedFilms}   
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header location={"main"} />
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
                  <Register onSubmit={handleRegisterSubmit} />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Login onSubmit={handleLoginSubmit} />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <NotFound />
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
