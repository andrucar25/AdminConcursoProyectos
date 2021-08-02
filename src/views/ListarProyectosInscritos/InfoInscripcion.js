import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';


export const Documentos = ({paths,github}) => {

    
    return (
        <div style={{display:'flex',   padding:'5%',flexDirection:"column",justifyContent:"center",textAlign:"center" }}>
        <h1>Documentos del Proyecto y Repositorio Github</h1>
        
           <div style={{textAlign:"center",justifyContent:"center",display:"flex",flexDirection:"column",marginTop:"1rem"}}>
           {
               paths.map(p=>{
                   return (
                    <a href={`http://localhost:8000/api/v1/archivos/archivo?path=${p}`} variant="contained"  className=""  style={{margin:'1em',width:'90%',paddingTop:"5%",paddingBottom:"5%", backgroundColor:'#017ECA',color:'white', fontWeight:'bold',fontSize:"1.2rem" }}>{p.split('\\').pop().split('/').pop()} - Informe Final</a>
                   )
               })
           }           
           <a href={github} target="_blank" variant="contained"  className=""  style={{fontSize:"1.2rem",margin:"1em",width:'90%',paddingTop:"5%",paddingBottom:"5%", backgroundColor:'#414443',color:'white', fontWeight:'bold' }}>Repositorio GitHub</a> 
           </div>
        </div>
    )
}
