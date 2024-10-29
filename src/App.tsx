import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './components/paginas/login/Login';
import { useState } from 'react';
import GerenteInicio from './components/paginas/demanda/GerenteInicio';
import NavBar from './components/NavBar';
import DemandaConsulta from './components/paginas/demanda/DemandaConsulta';
import Demandar from './components/paginas/demanda/Demandar';
import CriarUsuario from './components/CriarUsuario';
import ContratarFuncionario from './components/paginas/funcionario/ContratarFuncionario';
import TodasDemandas from './components/paginas/demanda/TodasDemandas';
import Medico from './components/paginas/medico/Medico';
import Demandas from './components/paginas/medico/Demandas';

function App() {
  const urlBase:string  = "http://localhost:8080";
  const [usuarioInfo,setUsuarioInfo] = useState();
  
  return (
    <>
    <Router>
      <ConditionNavBar usuarioInfo={usuarioInfo}></ConditionNavBar>
      <Routes>  
        <Route path="/" element={<Login urlBase = {urlBase} setUsuarioInfo={setUsuarioInfo}></Login>}></Route>
        <Route path="/gerente" element={<GerenteInicio usuarioInfo={usuarioInfo}></GerenteInicio>}></Route>
        <Route path="/gerente/demanda" element={<TodasDemandas usuarioInfo={usuarioInfo} urlBase = {urlBase}></TodasDemandas>} ></Route>
        <Route path="/gerente/demanda/consulta" element={<DemandaConsulta usuarioInfo={usuarioInfo} urlBase ={urlBase}></DemandaConsulta>}></Route>
        <Route path="/gerente/demanda/consulta/dia" element={<Demandar urlBase={urlBase} usuarioInfo={usuarioInfo}></Demandar>}></Route>
        <Route path="/cadastrar" element={<CriarUsuario usuarioInfo={usuarioInfo} urlBase={urlBase}></CriarUsuario>}></Route>
        <Route path="/medico" element={<Medico usuarioInfo={usuarioInfo}></Medico>}></Route>

        <Route path="/medico/demanda" element={<Demandas urlBase={urlBase} usuarioInfo={usuarioInfo}></Demandas>}></Route>
      </Routes>
    </Router>
      
    </>
  )
}
const ConditionNavBar = ({usuarioInfo})=>{
  const location = useLocation(); 
  const showNavBar = location.pathname !== '/'; 

  return showNavBar ? <NavBar usuarioInfo={usuarioInfo} /> : null;
}

export default App
