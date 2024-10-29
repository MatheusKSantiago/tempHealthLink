import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Calendario from "../../Calendario";

function Demandas({urlBase,usuarioInfo}){
    const [especialidades,setEspecialidades] = useState();
    const [demandas,setDemandas] = useState();
    const buscarDemandasMesEspecialidade = async (especialidade)=>{
        
        const response = await fetch(`${urlBase}/demanda/${especialidade}`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
              'Authorization': `${usuarioInfo['token']}`
            }
          });
          const data = await response.json();
          return data
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
          return response;
    }
    useEffect(()=>{
        buscarEspecialidades();
    },[])
    async function alterarEstado(){
        let valorEspecialidade = document.getElementById("especialidade").value
        setDemandas(await buscarDemandasMesEspecialidade(valorEspecialidade == '' ? "CARDIOLOGIA" : valorEspecialidade));
        
    }
    return (
        <>
            <select  id="medicoEspecialidadeSelect" onChange={alterarEstado}>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
            </select>
            <select id="especialidade" name="especialidade" onChange={alterarEstado}>
                    {especialidades != null && especialidades.map((e,i)=><option value={e} key={i}>{e}</option>)}
                    </select>
            {demandas && demandas.map((d,i)=><p key={i}>Data: {d["data"]} Inicio: {d["horaInicio"]} Fim: {d["horaFim"]} Especialidade: {d["especialidadeMedica"]} Vagas: {d["vagas"]}</p>)}
        </>
    )
}

export default Demandas;