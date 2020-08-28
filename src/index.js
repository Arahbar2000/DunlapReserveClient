import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios'
import { Auth0Provider } from "@auth0/auth0-react"
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import { GoogleAuthProvider } from './context/googleProvider'
ReactDOM.render(
  <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
