import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import PlagioScreen from './Plagio';
import Plagio from '.';
import { Card, CardContent } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3F51B5",
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    maxWidth:"80%"
  },
});

export default function CustomizedTables() {
  const [proyectos, setProyectos] = React.useState([])
  React.useEffect(() => {
    Axios.get('http://localhost:4000/projectos').then(response=>{
      setProyectos(response.data)
    })
  }, [])
  const classes = useStyles();

  return (
    <>
    <Card>
    <CardContent>
    <h1 style={{fontWeight:"bold"}}>Listado de proyectos</h1>
    </CardContent>
    </Card>
    
   
    <TableContainer component={Paper} style={{display:"flex",justifyContent:"center"}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell align="right">Nombre de Proyecto</StyledTableCell>
            <StyledTableCell align="right">Nombre de Grupo</StyledTableCell>
            <StyledTableCell align="right">Encargado</StyledTableCell>
            <StyledTableCell align="right">Ciclo</StyledTableCell>
            <StyledTableCell align="right">Curso</StyledTableCell>
            <StyledTableCell align="right">Docente</StyledTableCell>
            <StyledTableCell align="right">Categoria</StyledTableCell>
            <StyledTableCell align="right">Concurso</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {proyectos.map((row,index) => (
            <StyledTableRow key={row.name} onClick={()=>{
              window.location.replace(`/app/plagio?q=${row._id}`);
            }}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.nombreProyecto}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nombreGrupo}</StyledTableCell>
              <StyledTableCell align="right">{row.encargado}</StyledTableCell>
              <StyledTableCell align="right">{row.ciclo}</StyledTableCell>
              <StyledTableCell align="right">{row.curso}</StyledTableCell>
              <StyledTableCell align="right">{row.docente}</StyledTableCell>
              <StyledTableCell align="right">{row.categoria}</StyledTableCell>  
              <StyledTableCell align="right">{row.concurso}</StyledTableCell>  
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}