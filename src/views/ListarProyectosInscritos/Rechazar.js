import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import swal from 'sweetalert';


export const RechazarCorreo = ({correo,_id}) => {


    const [asunto, setAsunto] =useState('')
    const [mensaje, setMensaje] =useState('')

    const Enviar = () => {
       Axios.post(`http://localhost:4000/projectos/correo/rechazar/${_id}`,{
                "Email":correo,
                "Subject":asunto,
                "Text":mensaje
                   });
        
                      swal("Se envió el correo correctamente", {
        
                        icon: "success",
        
                      });
                    

                  
    }


    return (
       
       
        <div style={{display:'table-center',  padding:'5%'}}>
        <h1>Enviar Correo de Rechazo al encargado del Proyecto</h1><br/>
           <p><TextField style={{fontsize: '1.8rem', width: '100%'}}
          label="Asunto"
          id="asunto"
          variant="outlined"
          onChange={e => setAsunto(e.target.value)}
          
        /></p>
           <br/><p> 
           <TextField style={{fontsize: '1.8rem', width: '100%'}}
          id="mensaje"
          label="Mensaje"
          multiline
          rows={15}
          variant="outlined"
          onChange={e => setMensaje(e.target.value)}
        />
          
         </p>
        
        <br/><br/>
            <p> <Button style={{backgroundColor:'#38e22c', color:'white', fontWeight:'bold'}} onClick={Enviar}>Enviar Correo</Button></p>
           
        </div>
        
    )

    }