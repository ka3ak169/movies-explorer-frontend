import {
  Route,
  Routes,
  // useNavigate,
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

function App() {
  return (
  <div className="page">
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header location={"home"}/>
            <Main/>
            <Footer/>
          </>
        }
      />
      <Route
        path="/movies"
        element={
          <>
            <Header location={"main"}/>
            <Movies/>
            <Footer/>
          </>
        }
      />
      <Route
        path="/saved-movies"
        element={
          <>
            <Header location={"main"}/>
            <SavedMovies location={"saved"}/>
            <Footer/>
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <Header  location={"main"}/>
            <Profile/>
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <Register/>
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <Login/>
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
  </div>
  );
}

export default App;
