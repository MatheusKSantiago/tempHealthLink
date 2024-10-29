import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./DemandaConsulta.module.css"
import { useNavigate } from "react-router-dom";
import Calendario from "../../Calendario";
function DemandaConsulta({usuarioInfo, urlBase}){    
    
    return (
        <Calendario setResponse={(a)=>{}}urlDia = {"/gerente/demanda/consulta/dia"}urlBase={urlBase} usuarioInfo={usuarioInfo}>
        </Calendario>
    );
}

export default DemandaConsulta;