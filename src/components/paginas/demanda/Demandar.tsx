import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Demandar.module.css"
import Horario from "../../Horario";
import { useState } from "react";
import backIcon from "../../../assets/arrowBack.svg"
import selectVagasIcon from "../../../assets/selectVagas.svg"
function Demandar({urlBase,usuarioInfo}){
    const location = useLocation();
    const { demandas, mes, ano, dia,especialidade } = location.state || {};
    const [turnoS,setTurno] = useState("Manhã");
    const [novasDemandas,setNovas] = useState(demandas);
    const navigate = useNavigate();
    function voltar(){
        navigate("/gerente/demanda/consulta")
    }
    const lancar = async (inicio,fim,numVagas)=> {
        
        const response = await fetch(`${urlBase}/demanda`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
                'Authorization': `${usuarioInfo['token']}`
            },
            body: JSON.stringify([{data: `${ano}-${mes}-${dia}`, inicio: inicio+":00",fim: fim+":00", especialidadeMedica: especialidade,vagas: numVagas}])
          });
    }
    function pedirConfirmacao(inicio,fim){
        setTimeout(() => {
            let numVagas = document.getElementById("inputVagas").value
            if(numVagas <= 0){
                alert(`Número de vagas deve ser positivo`)
            }else{
                const confirmacao = confirm(`Confirme a demanda: \nEspecialidade: ${especialidade}\nData: ${dia}/${mes}/${ano}\nInicio: ${inicio}\nFim: ${fim}\nVagas: ${numVagas}`);
                if (confirmacao) {
                    
                    lancar(inicio,fim,numVagas)
                    setNovas([...novasDemandas,{data: `${ano}-${mes}-${dia}`, horaInicio: inicio+":00",horaFim: fim+":00", especialidadeMedica: especialidade,vagas: numVagas}]);
                }
            }
        }, 250);
        
    }
    return (
        <>
        <div className={styles.containerDemandar}>
            <div>
                <button onClick={voltar} className={styles.btnVoltar}><img src={backIcon} alt="" /></button>
            </div>
            
            <div className={styles.horarios}>  
                <div className={styles.divSelectsDemandar}>
                    <select onChange={(e)=>setTurno(e.target.value)} id="turnoSelect">
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noite">Noite</option>
                        <option value="Madrugada">Madrugada</option>
                        <option value="Todos">Todos</option>
                    </select>
                    <label htmlFor="vagas"><img src={selectVagasIcon} alt="" /></label>
                    <input name="vagas" className={styles.inputVagas} defaultValue="1" min="1" type="number" id="inputVagas"/>  
                </div>
                
                <Horario turno={turnoS} pd = {pedirConfirmacao}></Horario>
                <div>
                    <h3 className={styles.h3Especialidade}>{especialidade}</h3>
                </div>
                <div >
                    {novasDemandas.map((d, index) => (     
                        <p key={index}>Data: {d["data"].split("-")[2]}/{d["data"].split("-")[1]}/{d["data"].split("-")[0]} Início: {d["horaInicio"]} Fim: {d["horaFim"]} Vagas: {d["vagas"]}</p>
                    ))} 
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Demandar;