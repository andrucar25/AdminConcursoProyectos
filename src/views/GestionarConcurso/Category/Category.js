import { Box, CardContent, Card, makeStyles } from '@material-ui/core'
import React, { useState,useEffect, useRef } from 'react'
import Save from './Save';
import AddCourse from './AddCourse';
import AddJury from './AddJury';
import CustomizedSteppers from './Stepper';
import swal from '@sweetalert/with-react';
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '80ch',
      },
      button: {
        margin: theme.spacing(1),
      },
    },
  }));
const Category = (props) => {

  /////
  const ismounted = useRef(false)
  const [columns, setColumns] = useState([])
  const [catA, setCatA] = useState([])
  const [catB, setCatB] = useState([])
  const [catC, setCatC] = useState([])
  /////
  const isJuryMounted = useRef(false)
  const [juryColumns, setJuryColumns] = useState([])
  const [juryA, setJuryA] = useState([])
  const [juryB, setJuryB] = useState([])
  const [juryC, setJuryC] = useState([])
  /////
  const [concurso, setConcurso] = useState([])
  /////
    const classes = useStyles();
    const [showCourse, setshowCourse] = useState(false)
    const [showJury, setshowJury] = useState(false)
    const [showSave, setshowSave] = useState(false)
    const [count,setCount] = useState(0)

    ////
    const ismountedCategory = useRef(false)
    const [activeConcurso, setActiveConcurso] = useState(false)

    ////
    const [titulo, setTitulo] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [horaInicio, setHoraInicio] = useState('')
    const [horaFin, setHoraFin] = useState('')
    const [id, setid] = useState('')
  useEffect(() => {
    if(ismountedCategory.current == false){
      
        fetch('http://localhost:4000/concurso/active').then(response=>response.json()
        ).then(data=>{
          if(data.estado){       
            console.log(data)     
            setActiveConcurso(true)
            setid(data._id)
            setTitulo(data.titulo)
            setFechaInicio(data.fechaInicio)
            setFechaFin(data.fechaFin)
            setHoraInicio(data.horaInicio)
            setHoraFin(data.horaFin)
          }
        }).catch(error=>{
          console.log('Hubo un problema con la petición Fetch:' + error.message);
        })
        ismountedCategory.current = true     
      }
      
    }, [])

    useEffect(() => {
    if( count == 0 ){
        setshowSave(false)
        setshowJury(false)
        setshowCourse(true)
    }
    if( count == 1 ){
        setshowCourse(false)
        setshowSave(false)
        setshowJury(true)
    }
    if( count == 2 ){
        setshowCourse(false)
        setshowJury(false)
        setshowSave(true)
    }
    if( count == 3 ) {
     
        const data = {
            titulo:titulo,
            categorias:[
              {
                  nombre:"Categoria A",
                  cursos:catA.cursos,
                  jurados:juryA.jurados
                },            
                {
                  nombre:"Categoria B",
                  cursos:catB.cursos,
                  jurados:juryB.jurados
                },    
                {
                  nombre:"Categoria C",
                  cursos:catC.cursos,
                  jurados:juryC.jurados
                },   
            ],         
            fechaInicio:fechaInicio.substr(0,10),
            fechaFin:fechaFin.substr(0,10),
            horaInicio:horaInicio,
            horaFin:horaFin            
        }
        swal({
          title: "Estar seguro de crear un concurso?",
          text: "Los cambios realizados pueden editarse luego",
          icon: "info",
          buttons: true            
        })
        .then((willDelete) => {
          if (willDelete) {
          
            Axios.put(`http://localhost:4000/concurso/${id}/update`,data).then(res => {
              console.log(res.data)
              swal("Poof! Los cambios fueron procesados!", {
                icon: "success",
                });
            })
            
          } else {
            swal("El concurso imaginario fue cancelado");
          }
        });
    }
    

}, [count])    
    return (
        <>
     
              <Card style={{marginBottom:"5%"}}>
                <CardContent>
                <h1>{titulo}</h1>
                </CardContent>
              </Card>

        {
          activeConcurso ?
          (<Card>
            <CardContent>
            <Box
                m={5}
                display="flex"
                justifyContent="center"
                flexDirection="column"
                height="100%"
            >
                {

                showCourse &&
                   (<AddCourse catA={catA} catB={catB} catC={catC} setCatA={setCatA} setCatB={setCatB} setCatC={setCatC} columns={columns} setColumns={setColumns} ismounted={ismounted}/>)
                }

                {

                showJury &&
                   (<AddJury juryColumns={juryColumns} setJuryColumns={setJuryColumns} juryA={juryA} setJuryA={setJuryA} juryB={juryB} setJuryB={setJuryB} juryC={juryC} setJuryC={setJuryC} isJuryMounted={isJuryMounted}/>)
                }

                {

                showSave &&
                   (<Save catA={catA} catB={catB} catC={catC} juryA={juryA} juryB={juryB} juryC={juryC}/>)
                }
            </Box>    
            <Box
                m={5}
                display="flex"
                justifyContent="center"
                flexDirection="column"
                height="100%"
            >
               <CustomizedSteppers setCount={setCount} ismounted={ismounted} isJuryMounted={isJuryMounted} setJuryA={setJuryA} setJuryB={setJuryB} setJuryC={setJuryC} setCatA={setCatA} setCatB={setCatB} setCatC={setCatC}/>
            </Box>
            </CardContent>
          </Card>) :(<div><h2>No hay ningun Concurso Activo</h2></div>)
        }
          
         
          </>
    )
}

export default Category
