import { useNavigate } from "react-router-dom";
import styles from "./GerenteInicio.module.css";

function GerenteInicio({usuarioInfo}){
    const navigate = useNavigate();

    return (
        <div className={styles.containerGerenteInicio}>
            <h1>Bem-vindo! {usuarioInfo["nome"]}</h1>
            <div className={styles.btn} onClick={()=>navigate("/gerente/demanda/consulta")}>
                <p>GERAR DEMANDAS</p>
            </div>
            <div className={styles.btn} onClick={()=>navigate("/gerente/demanda")}>
                <p>VER TODAS AS DEMANDAS</p>
            </div>
            <div className={styles.btn} onClick={()=>navigate("/cadastrar")}>
                <p>CADASTRAR USUÁRIO</p>
            </div>
                        
        </div>
    );
}
export default GerenteInicio;