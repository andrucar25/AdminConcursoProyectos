import { Box, Card, CardContent, Container, Toolbar } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import Page from 'src/components/Page'

const Votacion = () => {
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
    return (
        <Page
        title="Votacion de Concurso"
      >
        <Container maxWidth={false}>
          <Toolbar />
          <Box mb={3}>
            <h1>Votación</h1>
          </Box>
            <Card>
            <CardContent>
            <select className="form-control">
                    <option>Categoria A</option>
                </select>
            <Box
                m={5}
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
            >            
                
                <div>
                    <h3>Pagina web para motorizados sac.</h3>
                    <h4>Omega Team</h4>
                    <div>
                        <p>Franklin Carlos</p>
                        <p>Andrés Eduardo</p>
                        <p>Jose Edilberto</p>
                    </div>
                </div>
                            
            <div style={{display:'flex',flexDirection:'column'}}>                
            <button className="btn btn-warning" style={{marginBottom:'2%'}}>Comenzar</button>
                <button className="btn btn-info" style={{marginBottom:'2%'}}>Detener</button>
                <button className="btn btn-success">Resultados</button>
            </div>
            </Box>
            <Box
                m={5}
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
            >            
                
                <div>
                    <h3>Pagina web para los asociados.com</h3>
                    <h4>Iluminatis</h4>
                    <div>
                        <p>Franklin Carlos</p>
                        <p>Andrés Eduardo</p>
                        <p>Jose Edilberto</p>
                    </div>
                </div>
                            
            <div style={{display:'flex',flexDirection:'column'}}>            
                <button className="btn btn-warning" style={{marginBottom:'2%'}}>Comenzar</button>
                <button className="btn btn-info" style={{marginBottom:'2%'}}>Detener</button>
                <button className="btn btn-success">Resultados</button>
            </div>
            </Box>
            <Box
                m={5}
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
            >            
                
                <div>
                    <h3>Sistema para el terminal terrestre de tacna</h3>
                    <h4>Karbohidratos</h4>
                    <div>
                        <p>Franklin Carlos</p>
                        <p>Andrés Eduardo</p>
                        <p>Jose Edilberto</p>
                    </div>
                </div>
                            
            <div style={{display:'flex',flexDirection:'column'}}>                
            <button className="btn btn-warning" style={{marginBottom:'2%'}}>Comenzar</button>
                <button className="btn btn-info" style={{marginBottom:'2%'}}>Detener</button>
                <button className="btn btn-success">Resultados</button>
            </div>
            </Box>
            </CardContent>
          </Card>   
        </Container>
      </Page>
    )
}

export default Votacion
