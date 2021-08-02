import { Box, CardContent, makeStyles, Toolbar,Container, Card } from '@material-ui/core'
import { CastConnectedTwoTone } from '@material-ui/icons';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Page from 'src/components/Page'
import swal from 'sweetalert'
import DataTable from './table'
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
      fontFamily:"Roboto"
    },
  }));
const addId =(source) => {
  source.forEach((item, i) => {
    item.id = i + 1;
  });
  return source
}
const sortId=(source) => {
  let arr = []
  for (let i = 0; i < source.length; i++) {
    arr.push(i+1)
  }
  let arrdos = arr.sort(()=>0.5 - Math.random())
  source.forEach((item, i) => {
    item.id = arrdos[i];
  });
  return source
}
const Sorteo = () => {
    const [project, setproject] = useState([])
    const [catA, setcatA] = useState([])
    const [catB, setcatB] = useState([])
    const [catC, setcatC] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/projectos/projectos/aprobados')
  .then(response => response.json())
  .then(data => {
    setproject(data)
    const resultA = data.filter(pro => pro.categoria == 'Categoria A');
    setcatA(addId(resultA))
    const resultB = data.filter(pro => pro.categoria == 'Categoria B');
    setcatB(addId(resultB))
    const resultC = data.filter(pro => pro.categoria == 'Categoria C');
    setcatC(addId(resultC))
  });

    }, [])

    const ismountedCategory = useRef(false)
    const [activeConcurso, setActiveConcurso] = useState(false)
    const [id, setid] = useState('')
    const [titulo, setTitulo] = useState('')
    useEffect(() => {        
        if(ismountedCategory.current == false){
      
            fetch('http://localhost:4000/concurso/active').then(response=>response.json()
            ).then(data=>{
              if(data.estado){       
                console.log(data)
                setActiveConcurso(true)
                setid(data._id)
                setTitulo(data.titulo)
              }
            }).catch(error=>{
              console.log('Hubo un problema con la petición Fetch:' + error.message);
            })
            ismountedCategory.current = true     
          }
    }, [])
    const classes = useStyles();
    return (
        <Page
        className={classes.root}
        title="Gestion de Concurso"
      >
        <Container maxWidth={false}>
          <Toolbar />
          <Box mb={3}>
            <h1>Sorteo de proyectos</h1>
          </Box>
            <Card>
            <CardContent>
            <Box
                m={5}
                display="flex"
                justifyContent="center"
                flexDirection="column"
            >
                <div style={{display:'flex',justifyContent:'space-evenly'}}>
                  <div>
                    <h2>Categoria A</h2>
                <DataTable data={catA}/>              
                </div>
                <div>
                  <h2>Categoria B</h2>
                <DataTable data={catB}/>                
                </div>
                <div>
                  <h2>Categoria C</h2>
                <DataTable data={catC}/>   
                </div>
                </div>
            </Box>
            </CardContent>
            <Box
                m={5}
                display="flex"
                justifyContent="space-around"
                flexDirection="row"
            >
<button className="btn btn-info" style={{fontSize:'2rem',color:'white',fontWeight:'bold'}} onClick={()=>{     
                                           
                                           setcatA(v=>[...[],...sortId(catA)])
                                           setcatB(v=>[...[],...sortId(catB)])
                                           setcatC(v=>[...[],...sortId(catC)])
                                          console.log(catA)
                                        }}>Sortear</button>     
                                        <button className="btn btn-warning" style={{fontSize:'2rem',color:'white',fontWeight:'bold'}} onClick={()=>{
                                          const votacionA = {
                                            tituloConcurso:titulo,
                                            idConcurso:id,
                                            ordenProyectos:{categoria:'Categoria A',catA},
                                            categoria:'Categoria A',
                                            estado:'I'
                                          }
                                          const votacionB= {
                                            tituloConcurso:titulo,
                                            idConcurso:id,
                                            ordenProyectos:{categoria:'Categoria B',catB},
                                            categoria:'Categoria B',
                                            estado:'I'
                                          }
                                          const votacionC={
                                            tituloConcurso:titulo,
                                            idConcurso:id,
                                            ordenProyectos:{categoria:'Categoria C',catC},
                                            categoria:'Categoria C',
                                            estado:'I'
                                          }                                          
                                          swal({
                                            title: "Estar seguro de guardar el orden?",
                                            text: "Los cambios realizados pueden editarse luego",
                                            icon: "info",
                                            buttons: true            
                                          })
                                          .then((willDelete) => {
                                            if (willDelete) {
                                              
                                                
                                                Axios.post(`http://localhost:4000/orden`,votacionA)
                                                  
                                                Axios.post(`http://localhost:4000/orden`,votacionB)
                                                Axios.post(`http://localhost:4000/orden`,votacionC).then(res => {
                                                  console.log(res.data)
                                                  swal("Poof! Los cambios fueron procesados!", {
                                                    icon: "success",
                                                    });
                                                })
                                              
                                            } else {
                                              swal("El concurso imaginario fue cancelado");
                                            }
                                          });
                                        }}>Guardar</button>     

            </Box>
            
          </Card>
          
        </Container>
      </Page>
    )
}

export default Sorteo
