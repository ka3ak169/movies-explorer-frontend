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
import RedirectIfLoggedIn from "./RedirectIfLoggedIn/RedirectIfLoggedIn";
import { register, authorization, authorize } from "../utils/Auth";
import {
  getUserInformation,
  changeUserInformation,
  postFavoriteMovies,
  deleteFavoriteMovies,
  getInitialFilms,
} from "../utils/MainApi";
import { getAllFilms } from "../utils/MoviesApi";
import { useFormValidation } from "../utils/useFormValidation";

function App() {
  const { setValue } = useFormValidation();
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false); // попап регистрации
  const [loggedIn, setLoggedIn] = useState(false);
  const [registration, setRegistration] = useState(false); //состояние попапа
  const [changeInformation, setChangeInformation] = useState(false); //состояние попапа
  const [lastVisitedPage, setLastVisitedPage] = useState("/");
  const [films, setFilms] = useState([]); //массив который отрендерится
  const [filmsToMovies, setFilmsToMovies] = useState([]); //массив который отрендерится
  const [allFilms, setAllFilms] = useState([]); //массив с сервера после фильтра запроса
  const [savedFilms, setSavedFilms] = useState([]); //массив сохраненных фильмов
  const [saveToFilms, setSavedToFilms] = useState([]); // сохраненные для работы
  const [rowSavesFilms, setRowSavesFilms] = useState([]); // фильтры с кнопкой
  const [filmsToRender, setFilmsToRender] = useState([]); //массив фильмов для длинны и работы с ним до рендера
  const [rowMoviesFilms, setRowMoviesFilms] = useState([]); //массив фильмов с кнопкой
  const [prerenderMoviesFilms, setPrerenderMoviesFilms] = useState([]); //массив фильмов для ПРЕрендера на movies
  const [renderedMoviesFilms, setRenderedMoviesFilms] = useState([]); //массив фильмов для рендера на movies
  const [renderedSavesFilms, setRenderedSavesFilms] = useState([]); //массив фильмов для рендера на saves-movies
  const [searching, setSearching] = useState(false); //обозначает факт поиска
  const [nomatches, setNomatches] = useState(false); //состояние прелоадера
  const [savedNomatches, setSavedNomatches] = useState(false); //состояние прелоадера
  const [isLoading, setIsLoading] = useState(false); //состояние прелоадера
  const [searchError, setSearchError] = useState(false); //состояние прелоадера
  const [isChecked, setIsChecked] = useState(false); // состояние ползунка короткометражек
  const [isCheckedSaved, setIsCheckedSaved] = useState(false); // состояние ползунка сохраненных короткометражек
  const [preloaderHidden, setPreloaderHidden] = useState(false); //состояние кнопки прелоадера
  const [preloaderSavedHidden, setPreloaderSavedHidden] = useState(false); //состояние кнопки прелоадера
  const [rowsToShow, setRowsToShow] = useState(getDefaultRows()); // количество карточек
  const [lastSearchText, setLastSearchText] = useState(""); //текст последнего запроса

  const navigate = useNavigate();
  const location = useLocation();

  const getInintialSavedFilms = () => {
    getInitialFilms()
      .then((result) => {
        setSavedFilms(result);
        // console.log(savedFilms);
      })
      .catch((error) => {
        // Обработка ошибки
        console.log(error);
      });
  };

  //количество карточек
  function getDefaultRows() {
    const width = window.innerWidth;
    if (width >= 1280) return 16;
    if (width >= 930) return 12;
    if (width >= 750) return 8;
    return 5;
  }

  // Функция, которая будет вызываться при изменении размера окна
  function handleResize() {
    const newRowsToShow = getDefaultRows();
    // console.log(newRowsToShow);
    setRowsToShow(newRowsToShow);
  }

  useEffect(() => {
    handleResize();

    // Добавляем слушатель события resize
    window.addEventListener("resize", handleResize);

    // Удаляем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePreloaderButton = () => {
    const width = window.innerWidth;
    if (width < 930 && renderedMoviesFilms.length > rowsToShow) {
      setRowsToShow(rowsToShow + 2);
    } else if (width < 1280 && renderedMoviesFilms.length > rowsToShow) {
      setRowsToShow(rowsToShow + 3);
    } else if (width >= 1280 && renderedMoviesFilms.length > rowsToShow) {
      setRowsToShow(rowsToShow + 4);
    }

    // Проверяем, достигло ли значение rowsToShow необходимого порога
    if (rowsToShow + 4 >= renderedMoviesFilms.length) {
      setPreloaderHidden(false);
    }
  };

  const handleSavedPreloaderButton = () => {
    const width = window.innerWidth;
    if (width < 930 && renderedSavesFilms.length > rowsToShow) {
      setRowsToShow(rowsToShow + 2);
    } else if (width < 1280 && renderedSavesFilms.length > rowsToShow) {
      setRowsToShow(rowsToShow + 3);
    } else if (width >= 1280 && renderedSavesFilms.length > rowsToShow) {
      setRowsToShow(rowsToShow + 4);
    }
    // Проверяем, достигло ли значение rowsToShow необходимого порога
    if (rowsToShow + 4 >= renderedSavesFilms.length) {
      setPreloaderHidden(false);
    }
  };

  useEffect(() => {
    // Эта функция будет вызвана, когда allFilms или isChecked изменятся
    const renderFilms = () => {
      const filmsToRender = isChecked
        ? allFilms
        : allFilms.filter((film) => film.duration > 40);
      setFilms(filmsToRender.slice(0, rowsToShow));
    };
    renderFilms(); // Вызываем функцию рендеринга сразу, чтобы отобразить фильмы
  }, []);

  useEffect(() => {
    setRowMoviesFilms(renderedMoviesFilms.slice(0, rowsToShow));
    setRowSavesFilms(renderedSavesFilms.slice(0, rowsToShow));
  }, [renderedMoviesFilms, renderedSavesFilms, rowsToShow]);

  // управляет кнопкой прелоадера
  useEffect(() => {
    if (renderedMoviesFilms.length > rowsToShow) {
      setPreloaderHidden(true);
    } else {
      setPreloaderHidden(false);
    }
    if (renderedSavesFilms.length > rowsToShow) {
      setPreloaderSavedHidden(true);
    } else {
      setPreloaderSavedHidden(false);
    }
  }, [renderedMoviesFilms, renderedSavesFilms, rowsToShow, preloaderHidden]);

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
    if (location.pathname === '/movies') {
      getInintialSavedFilms();
    }
  }, [location.pathname]);

  useEffect(() => {
    // console.log(setSavedToFilms);
    getInintialSavedFilms(); //получение массива сохраненных фильмов
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token"); //получение токена
        const lastVisitedPage =
          localStorage.getItem("lastVisitedPage") || "/movies"; // Получение последней посещенной страницы
        const savedData = localStorage.getItem("lastSearchData");
        if (savedData) {
          const lastSearchData = JSON.parse(savedData);
          const { text, isCheckedFilter } = lastSearchData;
          setLastSearchText(text);
          const lastRequestFilms = getSearchFilms(text, allFilms);
          setPrerenderMoviesFilms(lastRequestFilms);
          setFilmsToMovies(lastRequestFilms);
          const filtredLastRequestFilms = filterDurationFilms(
            lastRequestFilms,
            isCheckedFilter
          );
          setRenderedMoviesFilms(filtredLastRequestFilms);
          setIsChecked(isCheckedFilter);
        }
        if (storedToken) {
          const token = JSON.parse(storedToken);
          await tokenCheck(token);
          setLoggedIn(true);
          navigate(lastVisitedPage, {replace: true}); // Перенаправление на последнюю посещенную страницу
        }
      } catch (error) {
        handleLogout();
        console.log(error);
      }
    };
    fetchData();
  }, [loggedIn, allFilms, searching]);

  useEffect(() => {
    const userData = async () => {
      try {
        const storedToken = localStorage.getItem("token"); //получение токена
        if (storedToken) {
          const token = JSON.parse(storedToken);
          await tokenCheck(token);
        }
        if (loggedIn) {
          const userData = await getUserInformation();
          setCurrentUser(userData.data);
        }
      } catch (error) {
        console.log(error);
        handleLogout();
      }
    };
    userData();
  }, [loggedIn, changeInformation]);

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

  const handleRegisterSubmit = (name, email, password) => {
    register(name, email, password)
      .then((result) => {
        setRegistration(true);
        setIsInfoTooltipPopupOpen(true);
        setTimeout(() => {
          closeAllPopups();
          handleLoginSubmit(email, password);
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
        navigate("/movies", {replace: true});
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
    return postFavoriteMovies(film, owner)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastVisitedPage");
    localStorage.removeItem("lastSearchText");
    localStorage.removeItem("lastSearchData");
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    setRowSavesFilms([]);
    setRowMoviesFilms([]);
    setAllFilms([]);
    setSavedFilms([]);
    setFilmsToRender([]);
    setIsChecked(false);
    setFilms([]);
    navigate("/",  {replace: true});
    setLastSearchText("");
    setPrerenderMoviesFilms([]);
    setFilmsToMovies([]);
    setRenderedMoviesFilms([]);
  };

  const filterDurationFilms = (films, isShort) => {
    return !isShort ? films : films.filter((f) => f.duration <= 40);
  };

  const searchFilterFilms = (searchText, films) => {
    const lowerSearchText = searchText.toLowerCase();
    return films.filter(
      (film) =>
        (film.nameRU && film.nameRU.toLowerCase().includes(lowerSearchText)) ||
        (film.nameEN && film.nameEN.toLowerCase().includes(lowerSearchText))
    );
  };

  useEffect(() => {
    setSavedToFilms(savedFilms);
    const filteredSave = filterDurationFilms(savedFilms, isCheckedSaved);
    setRenderedSavesFilms(filteredSave);
  }, [savedFilms]);

  useEffect(() => {
    const filteredSave = filterDurationFilms(saveToFilms, isCheckedSaved);
    setRenderedSavesFilms(filteredSave);
  }, [saveToFilms]);

  useEffect(() => {
    const filteredSave = filterDurationFilms(saveToFilms, isCheckedSaved);
    setRenderedSavesFilms(filteredSave);
  }, [isCheckedSaved]);

  useEffect(() => {
    if (allFilms) {
      const savedData = localStorage.getItem("lastSearchData");
    }
  }, [allFilms]);

  useEffect(() => {
    const filteredSave = filterDurationFilms(filmsToMovies, isChecked);
    setRenderedMoviesFilms(filteredSave);
  }, [isChecked]);

  useEffect(() => {
    const durationFiltered = filterDurationFilms(filmsToMovies, isChecked);
    setRenderedMoviesFilms(durationFiltered);
  }, [filmsToMovies]);

  //ПОЛУЧИЛИ ВСЕ ФИЛЬМЫ
  useEffect(() => {
    setFilms([]);
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      console.log("Поиск занимает слишком много времени!");
      setSearchError(true);
    }, 20000);
    getAllFilms()
      .then((result) => {
        clearTimeout(timeoutId);
        setSearching(true);
        setAllFilms(result);
        setIsLoading(false);
      })
      .catch((error) => {
        // Обработка ошибки
        clearTimeout(timeoutId);
        console.log(error);
        setSearchError(true);
      });
  }, []);

  const getSearchFilms = (searchText, filmsArray) => {
    return searchFilterFilms(searchText, filmsArray);
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
                    isLoading={isLoading}
                    searchError={searchError}
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                    rowsToShow={rowsToShow}
                    nomatches={nomatches}
                    setNomatches={setNomatches}
                    searching={searching}
                    films={rowMoviesFilms}
                    filmsToMovies={filmsToMovies}
                    setFilmsToMovies={setFilmsToMovies}
                    filmsToRender={renderedMoviesFilms}
                    preloaderHidden={preloaderHidden}
                    onPreloader={handlePreloaderButton}
                    onAddFilm={addFavoriteMovies}
                    onDelFilm={deleteFavoriteMovies}
                    onInitialFilm={getInintialSavedFilms}
                    lastSearchText={lastSearchText}
                    allFilms={allFilms}
                    onDutaionFilter={filterDurationFilms}
                    setRenderedMoviesFilms={setRenderedMoviesFilms}
                    location={"movies"}
                    savedFilms={savedFilms}
                    setSearching={setSearching}
                    onResize={handleResize}
                    setSavedFilms={setSavedFilms}
                    setSavedToFilms={setSavedToFilms}
                    saveToFilms={saveToFilms}
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
                    films={rowSavesFilms}
                    isLoading={isLoading}
                    savedFilms={savedFilms}
                    setSavedToFilms={setSavedToFilms}
                    renderedSavesFilms={renderedSavesFilms}
                    onDelFilm={deleteFavoriteMovies}
                    onDutaionFilter={filterDurationFilms}
                    setRenderedSavesFilms={setRenderedSavesFilms}
                    setIsCheckedSaved={setIsCheckedSaved}
                    isCheckedSaved={isCheckedSaved}
                    nomatches={savedNomatches}
                    setNomatches={setSavedNomatches}
                    searching={searching}
                    preloaderHidden={preloaderSavedHidden}
                    onPreloader={handleSavedPreloaderButton}
                    setSearching={setSearching}
                    onResize={handleResize}
                    setSavedFilms={setSavedFilms}
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
                  <RedirectIfLoggedIn
                    element={Register}
                    onSubmit={handleRegisterSubmit}
                  />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <RedirectIfLoggedIn
                    element={Login}
                    onSubmit={handleLoginSubmit}
                  />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <NotFound lastVisitedPage={lastVisitedPage}/>
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
