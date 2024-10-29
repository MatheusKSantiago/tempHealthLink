import CriarUsuario from "../../CriarUsuario";

function ContratarFuncionario( {usuarioInfo}){
    const info = {
        email: "",
        senha: "",
        acesso: "ATENDENTE",
        dataNascimento: "",
        nome: "",
        crm: "",
        especialidadeMedica: ""
    }
    return (
        <div>
            <CriarUsuario usuarioInfo={usuarioInfo} info={info}></CriarUsuario>
            <button onClick={()=>alert(JSON.stringify(info))}>
                submit
            </button>
        </div>
    )
}

export default ContratarFuncionario;