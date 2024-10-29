import { useEffect, useState } from "react";
import estilo from "./Horario.module.css"
function Horario({ turno, pd }){
    const pontos = ["",""]


    function estiloSelecionado (p1,p2){
        const paragraphs = document.querySelectorAll('p');

        if(p1>p2){
            let tempP1 = p1
            p1 = p2
            p2 = tempP1
        }

        paragraphs.forEach(p=>{
            if((p1 <= p.textContent && p2 >= p.textContent) || p1 == p.textContent || p2 == p.textContent){
                p.classList.add(estilo.pSelecionado)
            }
            else if(p.classList.contains(estilo.pSelecionado)){
                p.classList.remove(estilo.pSelecionado)
            }
        })
        return {inicio: p1, fim: p2}
    }
    function handleClick(e){
        let valor = e.target.textContent;

        if(pontos[0] == "" && pontos[1] != valor){
            pontos.splice(0,1)
            pontos.splice(0, 0, valor);
            estiloSelecionado(pontos[0],24)
        }
        else if(pontos[0] == valor){
            pontos.splice(0,1)
            pontos.splice(0, 0, "");
            estiloSelecionado(-1,pontos[1])
        }

        else if(pontos[1] == "" && pontos[0] != valor){
            pontos.splice(1,1)
            pontos.splice(1, 0, valor);
            estiloSelecionado(-1,pontos[1])
        }

        else if(pontos[1] == valor){
            pontos.splice(1,1)
            pontos.splice(1, 0, "");
            estiloSelecionado(pontos[0],24)
            
        }

        if(pontos[0] &&  pontos[1]){
            let r = estiloSelecionado(pontos[0],pontos[1])
            //confirm("Confirme a seguinte demanda: ")
            pd(r["inicio"],r["fim"])
        }
        
    }

    const hora0 = [
        <p key={0} style={styles.p} className={estilo.pHora} onClick={handleClick} >00:00</p>,
        <p key={1} style={styles.p} className={estilo.pHora} onClick={handleClick} >00:30</p>,
        <p key={2} style={styles.p} className={estilo.pHora} onClick={handleClick} >01:00</p>,
        <p key={3} style={styles.p} className={estilo.pHora} onClick={handleClick} >01:30</p>,
        <p key={4} style={styles.p} className={estilo.pHora} onClick={handleClick} >02:00</p>,
        <p key={5} style={styles.p} className={estilo.pHora} onClick={handleClick} >02:30</p>,
        <p key={6} style={styles.p} className={estilo.pHora} onClick={handleClick} >03:00</p>,
        <p key={7} style={styles.p} className={estilo.pHora} onClick={handleClick} >03:30</p>,
        <p key={8} style={styles.p} className={estilo.pHora} onClick={handleClick} >04:00</p>,
        <p key={9} style={styles.p} className={estilo.pHora} onClick={handleClick} >04:30</p>,
        <p key={10} style={styles.p} className={estilo.pHora} onClick={handleClick}>05:00</p>,
        <p key={11} style={styles.p} className={estilo.pHora} onClick={handleClick}>05:30</p>
    ];
    
    const hora1 = [
        <p key={12} style={styles.p} className={estilo.pHora} onClick={handleClick}>06:00</p>,
        <p key={13} style={styles.p} className={estilo.pHora} onClick={handleClick}>06:30</p>,
        <p key={14} style={styles.p} className={estilo.pHora} onClick={handleClick}>07:00</p>,
        <p key={15} style={styles.p} className={estilo.pHora} onClick={handleClick}>07:30</p>,
        <p key={16} style={styles.p} className={estilo.pHora} onClick={handleClick}>08:00</p>,
        <p key={17} style={styles.p} className={estilo.pHora} onClick={handleClick}>08:30</p>,
        <p key={18} style={styles.p} className={estilo.pHora} onClick={handleClick}>09:00</p>,
        <p key={19} style={styles.p} className={estilo.pHora} onClick={handleClick}>09:30</p>,
        <p key={20} style={styles.p} className={estilo.pHora} onClick={handleClick}>10:00</p>,
        <p key={21} style={styles.p} className={estilo.pHora} onClick={handleClick}>10:30</p>,
        <p key={22} style={styles.p} className={estilo.pHora} onClick={handleClick}>11:00</p>,
        <p key={23} style={styles.p} className={estilo.pHora} onClick={handleClick}>11:30</p>
    ];
    
    const hora2 = [
        <p key={24} style={styles.p} className={estilo.pHora} onClick={handleClick}>12:00</p>,
        <p key={25} style={styles.p} className={estilo.pHora} onClick={handleClick}>12:30</p>,
        <p key={26} style={styles.p} className={estilo.pHora} onClick={handleClick}>13:00</p>,
        <p key={27} style={styles.p} className={estilo.pHora} onClick={handleClick}>13:30</p>,
        <p key={28} style={styles.p} className={estilo.pHora} onClick={handleClick}>14:00</p>,
        <p key={29} style={styles.p} className={estilo.pHora} onClick={handleClick}>14:30</p>,
        <p key={30} style={styles.p} className={estilo.pHora} onClick={handleClick}>15:00</p>,
        <p key={31} style={styles.p} className={estilo.pHora} onClick={handleClick}>15:30</p>,
        <p key={32} style={styles.p} className={estilo.pHora} onClick={handleClick}>16:00</p>,
        <p key={33} style={styles.p} className={estilo.pHora} onClick={handleClick}>16:30</p>,
        <p key={34} style={styles.p} className={estilo.pHora} onClick={handleClick}>17:00</p>,
        <p key={35} style={styles.p} className={estilo.pHora} onClick={handleClick}>17:30</p>
    ];
    
    const hora3 = [
        <p key={36} style={styles.p} className={estilo.pHora} onClick={handleClick}>18:00</p>,
        <p key={37} style={styles.p} className={estilo.pHora} onClick={handleClick}>18:30</p>,
        <p key={38} style={styles.p} className={estilo.pHora} onClick={handleClick}>19:00</p>,
        <p key={39} style={styles.p} className={estilo.pHora} onClick={handleClick}>19:30</p>,
        <p key={40} style={styles.p} className={estilo.pHora} onClick={handleClick}>20:00</p>,
        <p key={41} style={styles.p} className={estilo.pHora} onClick={handleClick}>20:30</p>,
        <p key={42} style={styles.p} className={estilo.pHora} onClick={handleClick}>21:00</p>,
        <p key={43} style={styles.p} className={estilo.pHora} onClick={handleClick}>21:30</p>,
        <p key={44} style={styles.p} className={estilo.pHora} onClick={handleClick}>22:00</p>,
        <p key={45} style={styles.p} className={estilo.pHora} onClick={handleClick}>22:30</p>,
        <p key={46} style={styles.p} className={estilo.pHora} onClick={handleClick}>23:00</p>,
        <p key={47} style={styles.p} className={estilo.pHora} onClick={handleClick}>23:30</p>
    ];
    
    return (
        <>
            <div style={styles.container}>
                <h1 style={styles.h1}>{turno}</h1>
                <div style={styles.divP}>
                    { turno == "Madrugada" && hora0 }
                    { turno == "Manhã" && hora1 }
                    { turno == "Tarde" && hora2 }
                    { turno == "Noite" && hora3 }
                    { turno == "Todos" && [hora0,hora1,hora2,hora3]}
                </div>                
            </div>
        </>
    )
}

const styles = {
    container : {
        display: 'flex',
        
        flexDirection: 'column',
        width: '100%'
    },
    p: {
        textAlign: 'left',
        marginTop: '0.7em',
        marginBottom: '0.5em',
        padding: '2em'
        
    },
    divP: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#efefef'
    },
    h1: {
        backgroundColor: "#efefef",
        textAlign: 'center'
    }
    
}

export default Horario;