import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/CRM-LOGO.png"
import styles from "./NavBar.module.css"
function NavBar({usuarioInfo})
{
    const navigate = useNavigate();
    function navegarTelaInicial(){
        let acesso = usuarioInfo["acesso"]
        switch (acesso) {
            case "GERENTE":
                navigate("/gerente");    
                break;
            case "PACIENTE":

                break;
            case "MEDICO":
                navigate("/medico")
                 break;

            case "ATENDENTE":
                break;
            default:
                navigate("/");
                break;
        }
    }
    return (
        <ul>
            <li className={styles.imgContainer}>
                <div>
                    <img src={logo} alt="" className={styles.img} onClick={navegarTelaInicial} />

                </div>
                </li>
            <li><button onClick={()=>navigate("/")}>sair</button></li>
        </ul>
    )
}

export default NavBar;