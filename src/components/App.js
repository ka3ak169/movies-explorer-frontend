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
  const [allFilms, setAllFilms] = useState([]); //массив с сервера после фильтра запроса
  const [savedFilms, setSavedFilms] = useState([]); //массив сохраненных фильмов
  const [saveToFilms, setSavedToFilms] = useState([]); // сохраненные для работы
  const [savedFilteredFilms, setSavedFilteredFilms] = useState([]); // отфильтрованные сохраненные
  const [filteredFilms, setFilteredFilms] = useState([]); // отфильтрованные 
  const [filmsToRender, setFilmsToRender] = useState([]); //массив фильмов для длинны и работы с ним до рендера
  const [renderedMoviesFilms, setRenderedMoviesFilms] = useState([]); //массив фильмов для рендера на movies
  const [renderedSavesFilms, setRenderedSavesFilms] = useState([]); //массив фильмов для рендера на saves-movies
  const [searching, setSearching] = useState(false); //обозначает факт поиска
  const [nomatches, setNomatches] = useState(false); //состояние прелоадера
  const [isLoading, setIsLoading] = useState(false); //состояние прелоадера
  const [searchError, setSearchError] = useState(false); //состояние прелоадера
  const [isChecked, setIsChecked] = useState(false); // состояние ползунка короткометражек
  const [isCheckedSaved, setIsCheckedSaved] = useState(false); // состояние ползунка сохраненных короткометражек
  const [preloaderHidden, setPreloaderHidden] = useState(false); //состояние кнопки прелоадера
  const [rowsToShow, setRowsToShow] = useState(getDefaultRows()); // количество карточек
  const [lastSearchText, setLastSearchText] = useState(''); //текст последнего запроса


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
        console.log(savedFilms);
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
    getInintialSavedFilms(); //получение массива сохраненных фильмов
    console.log(savedFilms);
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
              setIsLoading(true);
              getSearchFilms(text);
              console.log(isCheckedFilter);
              setIsChecked(isCheckedFilter);
            }
            if (storedToken) {
              const token = JSON.parse(storedToken);
              await tokenCheck(token);
              setLoggedIn(true);
              navigate(lastVisitedPage); // Перенаправление на последнюю посещенную страницу
            }
          } catch (error) {
            handleLogout();
            console.log(error);
          }
    };
    fetchData();
  }, [loggedIn]);

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
        // setCurrentUser(userData.data);
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
    // localStorage.removeItem("lastSearchText");
    localStorage.removeItem("lastSearchData");
    setCurrentUser({});
    setLoggedIn(false);
    // setFilteredSavedFilms([]);
    setAllFilms([]);
    setSavedFilms([]);
    setFilmsToRender([]);
    setIsChecked(false);
    setFilms([]);
    navigate("/");
  };

  //отрисовка фильмов
  // const renderFilms = (films, isChecked) => {
  //   const filmsToRender = isChecked
  //     ? films
  //     : films.filter((film) => film.duration > 40);
  //   setFilmsToRender(filmsToRender);
  //   setFilms(filmsToRender.slice(0, rowsToShow));
  // };

  const filterDurationFilms = (films, isShort ) => {
    return isShort ? films : films.filter((f) => f.duration > 40);
  };

  const searchFilterFilms = (searchText, films ) => {
    const lowerSearchText = searchText.toLowerCase();
    return films.filter(
      (film) =>
        (film.nameRU && film.nameRU.toLowerCase().includes(lowerSearchText)) ||
        (film.nameEN && film.nameEN.toLowerCase().includes(lowerSearchText))
    );
  };
  
  useEffect(() => {
    console.log('12333333');
    setSavedToFilms(savedFilms);
    const filteredSave = filterDurationFilms(savedFilms, isCheckedSaved);
    console.log(filteredSave);
    
    setRenderedSavesFilms(filteredSave);
  }, [savedFilms]);

  useEffect(() => {    
    const filteredSave = filterDurationFilms(saveToFilms, isCheckedSaved);
    console.log(filteredSave);
    
    setRenderedSavesFilms(filteredSave);
  }, [saveToFilms]);

  useEffect(() => {
    console.log(savedFilms);
    console.log(savedFilteredFilms);
    const filteredSave = filterDurationFilms(saveToFilms, isCheckedSaved);
    setRenderedSavesFilms(filteredSave);
  }, [isCheckedSaved]);


  // useEffect(() => {
  //   const filteredSave = filterDurationFilms(savedFilms, isCheckedSaved);
  //   setRenderedSavesFilms(filteredSave);
  //   // setSavedFilteredFilms(savedFilms);
  //   console.log(renderedSavesFilms);
  //   console.log(savedFilms);
  // }, [savedFilms, isCheckedSaved]);

  // SavedFilteredFilms

  // useEffect(() => {
  //   const filteredSave = filterDurationFilms(savedFilms, isCheckedSaved);
  //   setRenderedSavesFilms(filteredSave);
  //   console.log(renderedSavesFilms);
  //   console.log(savedFilms);
  // }, [savedFilteredFilms]);


  // useEffect(() => {
  //   // console.log(savedFilms);
  //   const filteredSave = filterDurationFilms(savedFilteredFilms, isCheckedSaved);
  //   // setFilteredSavedFilms(filteredSave);
  //   setRenderedSavesFilms(filteredSave);
  // }, [ isCheckedSaved, loggedIn, savedFilteredFilms]);

  useEffect(() => {
    const filtered = filterDurationFilms(filteredFilms, isChecked);
    console.log(renderedMoviesFilms);
    // console.log(filtered);
    setRenderedMoviesFilms(filtered);
  }, [allFilms, isChecked, loggedIn, filteredFilms]);


  // useEffect(() => {
  //   // Эта функция будет вызвана, когда allFilms или isChecked изменятся
  //   const renderFilms = () => {
  //     const filmsToRender = isChecked
  //       ? allFilms
  //       : allFilms.filter((film) => film.duration > 40);
  //     setFilms(filmsToRender.slice(0, rowsToShow));
  //   };

  //   renderFilms(); // Вызываем функцию рендеринга сразу, чтобы отобразить фильмы
  // }, [allFilms, isChecked, rowsToShow, loggedIn, savedFilms]);


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
        setIsLoading(false);
        clearTimeout(timeoutId);
        setSearching(true);
        setAllFilms(result);
        console.log(result);

      })
      .catch((error) => {
        // Обработка ошибки
        clearTimeout(timeoutId);
        console.log(error);
        setSearchError(true);
      });
  }, []);

  // логика по нажатию на поиск
  // const getSearchFilms = (text) => {
  //   setFilms([]);
  //   setIsLoading(true);
  //   // Установка таймаута в 20 секунд
  //   const timeoutId = setTimeout(() => {
  //     console.log("Поиск занимает слишком много времени!");
  //     setSearchError(true);
  //   }, 20000);
  //   getAllFilms()
  //     .then((result) => {
  //       setIsLoading(false);

  //       clearTimeout(timeoutId);
  //       const lastSearchData = {
  //         text: text,
  //         isCheckedFilter: isChecked
  //       }
  //       console.log(text);
  //       setLastSearchText(text)
  //       setValue("filmName", text);
  //       // navigate("/movies");
  //       localStorage.setItem("lastSearchData", JSON.stringify(lastSearchData));
  //       setSearching(true);
  //       const searchText = text.toLowerCase();
  //       const filteredFilms = filterFilms(result, searchText);
  //       setAllFilms(filteredFilms);
  //       if (filteredFilms.length === 0) {
  //         setNomatches(true);
  //         setFilms([]);
  //         console.log("ничего не нашел");
  //       } else {
  //         setNomatches(false);
  //         renderFilms(filteredFilms, isChecked);
  //       }
  //     })
  //     .catch((error) => {
  //       // Обработка ошибки
  //       clearTimeout(timeoutId);
  //       console.log(error);
  //       setSearchError(true);
  //     });
  // };

  const getSearchFilms = (searchText, filmsArray) => {
    // setIsLoading(true);
    // // Установка таймаута в 20 секунд
    // const timeoutId = setTimeout(() => {
    //   console.log("Поиск занимает слишком много времени!");
    //   setSearchError(true);
    // }, 20000);
    // const filteredFilms = filterFilms(filmsArray, searchText);
    // const lastSearchData = {
    //   text: searchText,
    //   isCheckedFilter: isChecked,
    // };
    // localStorage.setItem("lastSearchData", JSON.stringify(lastSearchData));



    
    // setSearching(true);
    // setLastSearchText(searchText)
    // setValue("filmName", searchText);
    // if (filteredFilms.length === 0) {
    //           setNomatches(true);
    //           setFilms([]);
    //           console.log("ничего не нашел");
    //         } else {
    //           setNomatches(false);
    //           // renderFilms(filteredFilms, isChecked);
    //         }
    return searchFilterFilms(searchText, filmsArray);
    
    // console.log(searhedFilms);

    // console.log(filteredFilms);
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
                    films={renderedMoviesFilms}
                    filteredFilms={filteredFilms}
                    filmsToRender={filmsToRender}
                    preloaderHidden={preloaderHidden}
                    onPreloader={handlePreloaderButton}
                    onAddFilm={addFavoriteMovies}
                    onDelFilm={deleteFavoriteMovies}                    
                    onInitialFilm={getInintialSavedFilms}
                    lastSearchText={lastSearchText}
                    allFilms={allFilms}
                    onDutaionFilter={filterDurationFilms}
                    setRenderedMoviesFilms={setRenderedMoviesFilms}
                    setFilteredFilms={setFilteredFilms}
                    location={"movies"}
                    setSearching={setSearching}
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
                    films={renderedSavesFilms}
                    isLoading={isLoading}
                    setIsChecked={setIsChecked}
                    savedFilms={savedFilms}
                    setSavedFilms={setSavedFilms}
                    setSavedFilteredFilms={setSavedFilteredFilms}
                    saveToFilms={saveToFilms}
                    setSavedToFilms={setSavedToFilms}
                    savedFilteredFilms={savedFilteredFilms}
                    renderedSavesFilms={renderedSavesFilms}
                    onDelFilm={deleteFavoriteMovies}
                    onInitialFilm={getInintialSavedFilms}
                    lastSearchText={lastSearchText}
                    onDutaionFilter={filterDurationFilms}
                    setRenderedSavesFilms={setRenderedSavesFilms}
                    setIsCheckedSaved={setIsCheckedSaved}
                    isCheckedSaved={isCheckedSaved}                    
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
