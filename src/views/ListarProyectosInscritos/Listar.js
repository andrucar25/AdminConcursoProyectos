import React, { useEffect, useState } from 'react'
import Tabla from './Tabla';
import swal from '@sweetalert/with-react';
import { Repo } from './Reporte';
import Axios from 'axios'
import Reporte from './Reporte';
import {RechazarCorreo} from'./Rechazar';
import { Documentos } from './InfoInscripcion';

const Listar = () => {


      const [proyectos, setProyecto] = useState([])

      const [state, setstate] = useState("")

      //Funcion Listar Proyectos Inscritos
      const ListarProyectosInscritos = ()=>{
        
        Axios.get('http://localhost:4000/projectos/projectos/inscritos')
        .then( (response)  => {
          // handle success

            setProyecto(response.data)
          
          console.log(response.data);
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      }


      //Peticion Listar Proyectos Inscritos
      useEffect(() => {
          ListarProyectosInscritos();        
        }, [])

        //Modal Datos Especificos Proyecto
    const Ver = (row) => {
        swal (<Reporte 
          Data ={row}
          />) 
    }

    //Modal Botones descarga de documentos y github
    const Inscripcion = (paths,github) => {
      swal (<Documentos paths={paths} github={github}/>) 
  }

  
    //Boton Aceptar Proyecto
    const Aceptar = (correo,_id) =>{
      
        swal({
            title: `¿Está seguro de aceptar e inscribir al Proyecto? El usuario es ${correo}`,
            text: "Una vez aceptado el proyecto, estará inscrito al concurso de proyectos presente",
            icon: "warning",
            buttons: true,
            dangerMode: false,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Se envió el correo de confirmando la inscripción al encargado del proyecto", {

                icon: "success",

              });
              Axios.post(`http://localhost:4000/projectos/correo/aceptar/${_id}`,{"Email":correo}).then(response=>{
                fetch(`http://127.0.0.1:8000/api/v1/plagios/convertir?id_proyecto=${_id}`, {
                  headers: {
                    Accept: "application/json"
                  },
                  method: "POST"
                })
                ListarProyectosInscritos();
              })
              
            
            
           
            } 
          });
    }
    //Boton Rechazar Proyecto
    const Rechazar = (correo, _id) =>{
      swal(<RechazarCorreo 
        correo={correo} 
        _id={_id}/>)
    }
  
    return (
        <div>
          <Tabla  Modal = {Ver}
          Acept = {Aceptar}
          Recha = {Rechazar}
          Data = {proyectos}
          Docs = {Inscripcion}
          /> 
        </div>
    )
}

export default Listar
