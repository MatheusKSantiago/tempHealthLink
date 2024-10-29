import { useNavigate } from "react-router-dom";
import styles from "./Medico.module.css";

function Medico({usuarioInfo}){
    const navigate = useNavigate();
    return (
        <div className={styles.containerMedicoInicio}>
            <h1>Bem-vindo! {usuarioInfo["nome"]}</h1>
            <div className={styles.btn} onClick={()=>{
                
                navigate("/medico/demanda", {state : 
                    {uri: `demanda/${usuarioInfo['especialidadeMedica']}`}
                })

            }}>
                <p>Ver Vagas</p>
            </div>
        </div>
    )
}

export default Medico;