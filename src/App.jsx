import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
// import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Tamagochi } from './pages/mascota/Tamagochi';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

export const App = () => {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        {/* <Route path="/register" element={<Register></Register>}></Route> LA COMENTO PQ AHORA SE RENDERIZA DENTRO DEL LOGIN*/}

        <Route
          path="/tamagochi"
          element={
            // <PrivateRoute>
            //   <Tamagochi />
            // </PrivateRoute>
            <Tamagochi />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

/*

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

*/
