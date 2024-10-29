import { useEffect, useState } from "react"
import estilo from "./CriarUsuario.module.css"
function CriarUsuario({usuarioInfo, urlBase}){

    
    const [medicoOpt,setMedicoOpt] = useState(false);
    const [uri,setUri] = useState("funcionario/gerente");
    let [especialidades,setEspecialidades] = useState();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [acesso, setAcesso] = useState("ATENDENTE");
    const [nascimento, setNascimento] = useState("");
    const [nome, setNome] = useState("");
    const [crm, setCrm] = useState("");
    const [especialidadeMedica, setEspecialidadeMedica] = useState("CARDIOLOGIA");
    
    const cadastrarUsuario = async (uri) => {
        
    }
    const buscarEspecialidades = async ()=>{
        const response = await fetch(`${urlBase}/medico/especialidades`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
              'Authorization': `${usuarioInfo['token']}`
            }
          });
          if(response.ok){
            setEspecialidades(await response.json())
            
          }
          
    }
    
    useEffect(()=>{
        buscarEspecialidades();
    },[])
    return (
        <div className={estilo.containerCriarUsuario}>
            <div className={estilo.divInputLabel}>
                <label  htmlFor="nome">Nome:</label>    
                <input onChange={(e)=>{
                    setNome(e.target.value)
                }}type="nome" name="nome" placeholder="nome" />
            </div>
            <div className={estilo.divInputLabel}>
                <label  htmlFor="email">Email:</label>    
                <input onChange={(e)=>{
                    setEmail(e.target.value)
                }} type="email" name="email" placeholder="email" />
            </div>
            {
               medicoOpt &&
                <>
                    <div className={estilo.divInputLabel}>
                        <label htmlFor="crm">CRM:</label>    
                        <input onChange={(e)=>{
                            setCrm(e.target.value)
                        }}className={estilo.inputCriarUsuario} type="text" name="crm" placeholder="crm" />
                    </div>
                    <div className={estilo.divInputLabel}>
                        <label  htmlFor="especialidade">Especialidade:</label>    
                        <select id="especialidade" onChange={(e)=>{
                            setEspecialidadeMedica(e.target.value)
                        }}
                        className={estilo.inputCriarUsuario}
                        name="especialidade">
                            
                            {especialidades.map((e,i)=><option value={e} key={i}>{e}</option>)}

                        </select>
                    </div>
        
                </>
                

            
            }
            <div className={estilo.divInputLabel}>
                <label  htmlFor="senha">Senha:</label>  
                <input onChange={(e)=>{
                    setSenha(e.target.value)
                }} type="password" name="senha" placeholder="senha" />
            </div>

            <div className={estilo.divInputLabel}>
                <label  htmlFor="data">Data de Nascimento:</label>    
                <input onChange={(e)=>{
                    setNascimento(e.target.value)
                }} type="date" name="data" placeholder="data de nascimento" />
            </div>
            
            <select name="acesso" className={estilo.selectAcesso} onChange={
                (e)=>{
                    console.log(e.target.value)
                setAcesso(e.target.value)
                
                if(e.target.value == "MEDICO"){
                    setUri("medico")
                    setMedicoOpt(true);
                }
                else if(e.target.value == "GERENTE" || e.target.value == "ATENDENTE"){
                    setUri("funcionario/gerente")
                    setMedicoOpt(false);
                    setCrm("")
                }else{
                    setUri("paciente")
                    setMedicoOpt(false);
                    setCrm("")
                }
            }
                         }>
                {usuarioInfo["acesso"] == "GERENTE" && <option value="ATENDENTE">Atendente</option>}
                {usuarioInfo["acesso"] == "GERENTE" && <option value="GERENTE">Gerente</option>}
                <option value="MEDICO">Médico</option>
                <option value="PACIENTE">Paciente</option>
            </select>
            <button onClick={async ()=>{
                let body = {
                    email: email,
                    nome: nome,
                    senha: senha,
                    nascimento: nascimento
                }
                if(acesso == "MEDICO"){
                    body["crm"] = crm;
                    body["especialidadeMedica"] = especialidadeMedica
                }else if(acesso != "PACIENTE"){
                    body["acesso"] = acesso
                }
                console.log(body)
                const response = await fetch(`${urlBase}/${uri}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `${usuarioInfo['token']}`
                
                    },
                    body: JSON.stringify(body)
                  });
                  if(!response.ok){
                    alert("Usuário não cadastrado")
                  }else{
                    alert("Usuário cadastrado!")
                  }
            }}>cadastrar</button>
        </div>
    )
}


export default CriarUsuario;