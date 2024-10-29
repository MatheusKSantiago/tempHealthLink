import { useNavigate } from "react-router-dom";
import styles from "./paginas/demanda/DemandaConsulta.module.css"
import { useEffect, useState } from "react";

function Calendario({usuarioInfo, urlBase, urlDia, setResponse}){
    let listaDemandas = [];
    let [especialidades,setEspecialidades] = useState(null);
    const buscarDemandasMesEspecialidade = async (especialidade,mes,ano)=>{
        
        const response = await fetch(`${urlBase}/demanda/${especialidade}/${mes}/${ano}`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
              'Authorization': `${usuarioInfo['token']}`
            }
          });
          const data = await response.json();
          setResponse(data);
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
    
    const navigate = useNavigate();
    const telaDia = (dia)=>{
        let demandaDia = [];
        listaDemandas.forEach(demanda =>{
            let data = new Date(demanda["data"]);
            if(data.getUTCDate() == Number(dia)){
                demandaDia.push(demanda)
            }
        })
        navigate(urlDia,{state: {demandas: demandaDia,
            mes: document.getElementById("mes").value, 
            ano: document.getElementById("ano").value,
            dia: dia,
            especialidade: document.getElementById("especialidade").value
        }});
    }
    function formarCalendario(){
        let mes = Number(document.getElementById("mes").value)
        let ano = Number(document.getElementById("ano").value)

        let ultimoDia = new Date(ano,mes,0).getDate();
        let exibicaoDoMes = document.getElementById("dias")
        exibicaoDoMes.innerHTML = "";
        for(let i=1;i<=ultimoDia;i++){
            let dia = document.createElement("div")
            let diaNum = document.createElement("p")
            diaNum.textContent = String(i).padStart(2,"0");
            dia.classList.add(styles.dia);
            dia.onclick = ()=>telaDia(diaNum.textContent);
            dia.appendChild(diaNum)
            exibicaoDoMes.appendChild(dia);
        }
    }

    async function alterarEstado(){
        formarCalendario();
        const info = {mes: document.getElementById("mes").value, ano: document.getElementById("ano").value, especialidade: document.getElementById("especialidade").value}
        
        listaDemandas = await buscarDemandasMesEspecialidade(info.especialidade == '' ? "CARDIOLOGIA" : info.especialidade,info.mes,info.ano);
        
    }
    useEffect(()=>{
        const res = async () =>{
            const response = await buscarEspecialidades();
            alterarEstado();
        }
        res()
        
        
    },[])
    return(
        <div className={styles.containerDemandaConsulta}>
            <div className={styles.selecao}>
                <div className={styles.divMes}>
                    <label htmlFor="mes">Mês:</label>
                    <select  id="mes" name="mes" onChange={alterarEstado}>
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
                </div>
                <div className={styles.divAno}>
                <label htmlFor="ano" >Ano:</label>
                    <select id="ano" name="ano" onChange={alterarEstado}>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </select>
                </div>
                <div className={styles.divEspecialidade}>
                <label htmlFor="especialidade">Especialidade:</label>
                <select id="especialidade" name="especialidade" onChange={alterarEstado}>
                    {especialidades != null && especialidades.map((e,i)=><option value={e} key={i}>{e}</option>)}
                    </select>
                </div>
            </div>
            <div id="exibicaoDoMes" className={styles.exibicaoDoMes}>
                <div id="dias" className={styles.dias}>

                </div>
            </div>
        </div>
    )
}

export default Calendario;