import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from '@mui/material';
import { amber } from '@mui/material/colors';
import { ThemeProvider } from '@mui/system';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#26a69a',
    },
    secondary: amber,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
