import { useEffect, useState } from "react";

function TodasDemandas({ usuarioInfo, urlBase }){
    const [demandas,setDemandas] = useState([])
    
    const buscarDemandas = async ()=>{
        const response = await fetch(`${urlBase}/demanda`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
              'Authorization': `${usuarioInfo['token']}`
            }
          });
          
          setDemandas(await response.json());
    }
    
    useEffect(()=>{
        buscarDemandas();
    },[])
    return (
        <div style={styles.div}>
            {JSON.stringify(demandas)}
        </div>
    )
}

const styles = {
    div: {
        color: 'black'
    }
}
export default TodasDemandas;