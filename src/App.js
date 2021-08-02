import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useReducer } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { authReducer } from './Auth/AuthReducer';
import { AuthContext } from './Auth/AuthContext';



const init = () => {
  return (
    JSON.parse(localStorage.getItem("token")) || {
      logged: false,
    }
  );
};

const App = () => {
  const [token, dispatch] = useReducer(authReducer, {}, init);
  const routing = useRoutes(routes);
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);
  return (
    <AuthContext.Provider value={{ token, dispatch }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
