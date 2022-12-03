import './App.css';
import FormularioAvion from './components/FormularioAvion';
import FormularioEmpleado from './components/FormularioEmpleado';
import Navbar from './components/Navbar';
import FormularioParametro from './components/FormularioParametro';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import FormularioValorParametro from './components/FormularioValorParametro';

function App() {
  return (
    <div className="App">

      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path='/'></Route>
          <Route exact path='/avion' element={<FormularioAvion></FormularioAvion>}></Route>
          <Route exact path='/empleado' element={<FormularioEmpleado></FormularioEmpleado>}></Route>
          <Route exact path='/parametro' element={<FormularioParametro></FormularioParametro>}></Route>
          <Route exact path='/valorParametro' element={<FormularioValorParametro></FormularioValorParametro>}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
