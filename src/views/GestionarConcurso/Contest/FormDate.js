import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, TextField } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
export default function FormDate({setFechaInicio,setFechaFin,setHoraInicio,setHoraFin,fechaInicio,fechaFin,horaInicio,horaFin}) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const classes = useStyles();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-evenly">
        <KeyboardDatePicker
        style={{width:'45%'}}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Fecha inicio"
          value={fechaInicio}
          onChange={date=>setFechaInicio(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
       <KeyboardDatePicker
       style={{width:'45%'}}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="ate-picker-inline"
          label="Fecha Fin"
          value={fechaFin}
          onChange={date=>setFechaFin(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <TextField
        id="time"
        label="Alarm clock"
        type="time"
        value={horaInicio}
        onChange={e=>setHoraInicio(e.target.value)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
         <TextField
        id="time"
        label="Alarm clock"
        type="time"
        value={horaFin}
        onChange={e=>setHoraFin(e.target.value)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}