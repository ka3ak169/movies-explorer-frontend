import {
  Route,
  Routes,
  // useNavigate,
} from "react-router-dom";
import Header from "./Header/Header";
import Main  from "./Main/Main";
import Movies  from "./Movies/Movies";

function App() {
  return (
  <div className="page">
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header/>
            <Main/>
          </>
        }
      />
      <Route
        path="/movies"
        element={
          <>
            <Header/>
            <Movies/>
          </>
        }
      />
    </Routes> 
  </div>
  );
}

export default App;
