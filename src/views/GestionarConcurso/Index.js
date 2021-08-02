import { Box, CardContent, makeStyles, Toolbar,Container, Card } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import Page from 'src/components/Page'
import MenuConcurso from './Contest/ButtonBase';
import Concurso from './Contest/Concurso'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/Auth/AuthContext';
import Category from './Category/Category';
import Sorteo from './Sort/index'
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
      fontFamily:"Roboto"
    },
  }));
const GestionarConcurso = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if(!token.access_token && !token.logged){
      navigate('/login', { replace: true });
    }
  }, [token])
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
        title="Gestion de Concurso"
      >
        <Container maxWidth={false}>
          <Toolbar />
          <Box mb={3}>
            <h1>Gestionar Concurso</h1>
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
                <p style={{marginBottom:"10%"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nullam eget laoreet quam, non tincidunt orci. Duis consequat 
                dolor eget vehicula vehicula. Donec leo dui, placerat vel dapibus 
                et, fringilla nec urna. Sed accumsan mi et velit laoreet sagittis.
                Integer condimentum vitae augue sit amet tempor. Aliquam erat volutpat.
                Sed at auctor sem.
                </p>
                <MenuConcurso 
                SetShowConcurso={SetShowConcurso}
                SetShowCategorias={SetShowCategorias}
                SetShowSorteo={SetShowSorteo}
                ></MenuConcurso>
            </Box>
            </CardContent>
          </Card>)
          }          
          {
          showConcurso &&
          (<Concurso showMenuPrincipal={showMenuPrincipal}/>)              
          }
          {
          showCategorias &&
          (<Category showMenuPrincipal={showMenuPrincipal}/>)    
          }
          {
            ShowSorteo &&
            (<Sorteo/>)
          }
        </Container>
      </Page>
    )
}

export default GestionarConcurso
