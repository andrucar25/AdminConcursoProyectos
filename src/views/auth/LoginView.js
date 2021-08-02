import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { AuthContext } from 'src/Auth/AuthContext';
import { types } from 'src/types/types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const { dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              codigo: '1234567890',
              password: '123456'
            }}
            validationSchema={Yup.object().shape({
              codigo: Yup.string().max(10).required('El codigo es obligatorio'),
              password: Yup.string().max(255).required('La contraseña es requerida')
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values)
              const path = "/";
              const codigo = parseInt(values.codigo)
              fetch('http://localhost:4000/auth/login', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({codigo:codigo,contrasenia:values.password}), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(response => {
                console.log('Success:', response)
                if(response.access_token){
                  dispatch({
                    type: types.login,
                    payload: response,
                  })
                  navigate('/app/dashboard', { replace: true });
                }                
              });
              
              // dispatch({
              //   type: types.login,
              //   payload: values,
              // });

              //history.replace(path);
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   setSubmitting(false);
              // }, 400);
//              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Inicia sesion
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Inicia sesion en nuestro sistema interno
                  </Typography>
                </Box>
          
                <TextField
                  error={Boolean(touched.codigo && errors.codigo)}
                  fullWidth
                  helperText={touched.codigo && errors.codigo}
                  label="Codigo"
                  margin="normal"
                  name="Codigo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="Codigo"
                  value={values.codigo}
                  variant="outlined"
                />
                <TextField  
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Inicia sesion
                  </Button>
                </Box>
               
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
