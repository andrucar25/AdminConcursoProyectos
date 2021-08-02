import { Box, CardContent, makeStyles, Toolbar,Container, Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Page from 'src/components/Page'
import Listar from './Listar'


const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
      fontFamily:"Roboto"
    },
  }));
  
const ListarProyectosInscritos = () => {
  
    const [showConcurso, SetShowConcurso] = useState(false)
    const [showCategorias, SetShowCategorias] = useState(false)
    const [ShowSorteo, SetShowSorteo] = useState(false)
    const [showMenu, SetShowMenu] = useState(true)
    const classes = useStyles();
    const showMenuPrincipal = () => {
            SetShowMenu(true)
            SetShowConcurso(false)
            SetShowCategorias(false)
            SetShowSorteo(false)
    }
    useEffect(() => {
        if(showConcurso === true || showCategorias === true || ShowSorteo === true){
            SetShowMenu(false)
        }
    }, [showConcurso,showCategorias,ShowSorteo])    
    return (
        <Page
        className={classes.root}
        title="Proyectos Inscritos"
      >
        <Container maxWidth={false}>
          <Toolbar />
          <Box mb={3}>
            <h1>Proyectos inscritos al Concurso de Proyectos 2020 - II</h1>
          </Box>
          {
            showMenu &&
            (<Card>
            <CardContent>
            <Box
                m={5}
                display="flex"
                justifyContent="center"
                flexDirection="column"
            >
              
              
            </Box>

            <Listar></Listar>
            </CardContent>
          </Card>)
          }          
          
        </Container>
      </Page>
    )
    
}

export default ListarProyectosInscritos
