import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({Data:row}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>

      <Typography variant="h5" component="h2">
         Nombre del Proyecto
        </Typography>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
        {row.nombreProyecto}
        </Typography>
       
        <br/>
        <Typography variant="h5" component="h2">
            Nombre del Grupo
        </Typography>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
         {row.nombreGrupo}
        </Typography>

        <br/>
        <Typography variant="h5" component="h2">
         Estudiantes
        </Typography>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
        {
          row.estudiantes.map(e=>{
            return(
            <p>{e.nombres}</p>
            )
          })
        }
        </Typography>

        <br/>
        <Typography variant="h5" component="h2">
         Categoria
        </Typography>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {row.categoria}
        </Typography>

        <br/>
        <Typography variant="h5" component="h2">
         Ciclo
        </Typography>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          IX
        </Typography>

        <br/>
        <Typography variant="h5" component="h2">
         Curso
        </Typography>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
        {row.curso}
        </Typography>


      </CardContent>
      <br/>
      <CardActions >
        <Button size="small" onClick={()=>{
          window.location.replace(`/app/plagio?q=${row._id}`);
        }}>Ver Reporte</Button>
      </CardActions>
    </Card>
  );
}

/*import React from 'react'



export const Repo = () => {
    return (
        <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </div>
    )
}
*/