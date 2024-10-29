import React, { InputHTMLAttributes, useState } from "react";
import styles from "./Login.module.css";
import emailIcon from "../../../assets/email.svg";
import senhaIcon from "../../../assets/senha.svg";
import { Navigate, useNavigate } from "react-router-dom";

function Login( {urlBase, setUsuarioInfo} )
{
    const [animar,setAnimar] = useState(false);
    const [email,setEmail] = useState(false);
    const [senha,setSenha] = useState(false);
    const navigate = useNavigate();
    
    const disparar = async ()=> {
        const response = await fetch(`${urlBase}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
        
            },
            body: JSON.stringify({ email: email, senha: senha })
          });
        if(!response.ok){
            let erro = (await response.json())["mensagem"];
            alert(erro)
        }else{
            const data=  await response.json();
            setUsuarioInfo(data);
            
            if(data["acesso"] == "GERENTE"){
                navigate("/gerente");
            }else if(data["acesso"] == "MEDICO"){
                navigate("/medico");
            }
            
        }
        
        
    }
    
    function animarLogin(){
        setAnimar(true);
    }
    function togglePass(){
        let i = document.getElementById("inputSenha");
        if(i?.type == 'text'){
            i.type = 'password';
        }else{
            i.type = 'text';
        }
    }

    return(
        <div className={styles.containerLogin}>
            
            <div className={styles.boasVindas}>
                <h2>Bem-Vindo !</h2>
                <p>Acesse sua conta e descubra como nossa plataforma pode facilitar o agendamento de consultas, a gestão de pacientes e a comunicação entre a equipe médica.</p>
                <div className={animar ? styles.desaparecer : styles.btnAcessar}onClick={animarLogin}><p>ACESSAR</p></div>
            </div>
            <div id="loginForm" className={animar ? styles.loginForm + ' ' + styles.animar: styles.loginForm}>
                <h1>Login</h1>
                <div id="inputEmailDiv" className={styles.inputDiv}>
                    <img src={emailIcon} alt="" className={styles.icon}/>
                    <input id="inputEmail" onChange={()=>setEmail(document.getElementById("inputEmail").value)}type="text" placeholder="email"/>
                </div>
                <div id="inputSenhaDiv" className={styles.inputDiv}>
                    <img src={senhaIcon} alt="" className={styles.icon}/>
                    <input id="inputSenha" onChange={()=>setSenha(document.getElementById("inputSenha").value)}type="password" placeholder="senha"/>
                </div>
                <div>
                    <input onChange={togglePass} id="checkBoxOcultar" type="checkbox" /><span>Mostrar Senha</span>
                </div>
                
                <div className={styles.btnAcessar}onClick={disparar}><p>entrar</p></div>
            </div>
        </div>
    );
}

export default Login;