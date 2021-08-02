import { Box, CardContent, Card, TextField, makeStyles, Button } from '@material-ui/core'
import React, { useState } from 'react'
import ListContest from './ListContest'
import FormDate from './FormDate'
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import swal from 'sweetalert';
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
const Concurso = (props) => {
    const [titulo, setTitulo] = useState('')
    const [fechaInicio, setFechaInicio] = useState(new Date())
    const [fechaFin, setFechaFin] = useState(new Date())
    const [horaInicio, setHoraInicio] = useState('')
    const [horaFin, setHoraFin] = useState('')

    const saveConcurso = () => {
      console.log(titulo)
      console.log(fechaInicio)
      console.log(fechaFin)
      console.log(horaInicio)
      console.log(horaFin)
    }
    const classes = useStyles();
    const saveChanges = () => {
        swal({
            title: "Estar seguro de crear un concurso?",
            text: "Ten en cuenta que una vez creado el concurso tendras que esperar hasta que termine para crear otro",
            icon: "info",
            buttons: true            
          })
          .then((willDelete) => {
            if (willDelete) {
              const data = {
                titulo,
                fechaInicio:fechaInicio.toISOString().slice(0,10),
                fechaFin:fechaFin.toISOString().slice(0,10),
                horaInicio,
                horaFin,
                estado:true
              }
              Axios.post('http://localhost:4000/concurso',data).then(res => {
                console.log(res.data)
                swal("Poof! El concurso fue creado!", {
                  icon: "success",
                  });
              })
              
            } else {
              swal("El concurso imaginario fue cancelado");
            }
          });
    }
    return (
        <>        
          <Card>
            <CardContent>
            <Box
                m={5}
                display="flex"
                justifyContent="center"
                flexDirection="column"
            >
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nullam eget laoreet quam, non tincidunt orci. Duis consequat 
                dolor eget vehicula vehicula. Donec leo dui, placerat vel dapibus 
                et, fringilla nec urna. Sed accumsan mi et velit laoreet sagittis.
                Integer condimentum vitae augue sit amet tempor. Aliquam erat volutpat.
                Sed at auctor sem.
                </p>              
            </Box>
            </CardContent>
          </Card>
          <Box
          display="flex"
          justifyContent="space-between"
           >
          <ListContest/>
          <Card style={{width:"70%",marginTop:"3%",textAlign:"center"}}>
              <CardContent>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Nombre del concurso de proyectos" onChange={e=>setTitulo(e.target.value)}/>                
              </form>
              
              <FormDate setFechaInicio={setFechaInicio} setFechaFin={setFechaFin} setHoraInicio={setHoraInicio} setHoraFin={setHoraFin} fechaInicio={fechaInicio} fechaFin={fechaFin} horaInicio={horaInicio} horaFin={horaFin}/>
              <Box
              style={{marginTop:"5rem"}}
              display="flex"
              justifyContent="space-evenly">
                  <Button
                    onClick={props.showMenuPrincipal}
                    style={{fontSize:"1.5rem"}}
                    variant="contained"                
                    size="large"
                    className={classes.button}
                    startIcon={<ArrowBackIcon/>}
                         >
                    Volver
                    </Button>
                        <Button
                        onClick={saveChanges}
                        style={{fontSize:"1.5rem"}}
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
              </Box>
              </CardContent>              
          </Card>
          </Box>
          </>
    )
}

export default Concurso
