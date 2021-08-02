import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Axios from 'axios';
import { useEffect } from 'react';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);




const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({Modal, Acept, Recha,Data, Docs}) {
  const classes = useStyles();
  //Encontrar el email del encargado del proyecto
  const Email =(estudiantes,codigo)=>{

    const result = estudiantes.filter(e=>e.codigo == codigo);
    return result[0].correo;
  }
  
  

  return (
    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">

        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Nro</StyledTableCell>
            <StyledTableCell align="center">Proyecto</StyledTableCell>
            <StyledTableCell align="center">Categoria</StyledTableCell>            
            <StyledTableCell align="center">Fecha y Hora de Envio</StyledTableCell>
            <StyledTableCell align="center">Documentos</StyledTableCell>
            <StyledTableCell align="center">Reporte</StyledTableCell>
            <StyledTableCell align="center">Acción</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((row,index) => (
            <StyledTableRow key={index}>
             
              <StyledTableCell align="left">{index + 1}</StyledTableCell>
              <StyledTableCell align="center">{row.nombreProyecto}</StyledTableCell>
              <StyledTableCell align="center">{row.categoria.substr(10,11)}</StyledTableCell>          
              <StyledTableCell align="center"><p>Fecha: {row.createdAt.substr(0,10)}</p>Hora: {row.createdAt.substr(11,8)}</StyledTableCell>
              <StyledTableCell align="center"><Button style={{backgroundColor:'#4693b4', color:'white', fontWeight:'bold'}} variant="contained" onClick={()=>Docs(row.path,row.github)}> Descargar</Button> </StyledTableCell>
              <StyledTableCell align="center"><Button variant="contained" style={{backgroundColor:'#3b978f', color:'white', fontWeight:'bold'}} onClick={()=>Modal(row)}>Detalles</Button> </StyledTableCell>
          <StyledTableCell style={{display:'flex', justifyContent:'space-between'}}><Button variant="contained"  className={classes.button} startIcon={<CheckIcon />} style={{width:'45%', backgroundColor:'#38e22c',color:'white', fontWeight:'bold' }} onClick={e=>Acept(Email(row.estudiantes,row.encargado),row._id)}>Aceptar</Button> 
              <Button variant="contained"  className={classes.button} startIcon={<DeleteIcon />} style={{width:'45%', background:'#e43c3a', color:'white', fontWeight:'bold' }}  onClick={e=>Recha(Email(row.estudiantes,row.encargado),row._id)}> Rechazar </Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//Nombres de los estudiantes del array dentro de la coleccion
/*<StyledTableCell align="center">{row.estudiantes.map((row,index)=><p key={index}>{row.nombres}</p>)}</StyledTableCell>*/