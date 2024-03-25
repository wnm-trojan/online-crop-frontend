import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './redux/store'
import { Provider } from "react-redux"
import axios from 'axios'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'flag-icon-css/css/flag-icons.min.css'
import './utils/i18nextConf'

axios.defaults.baseURL = "http://localhost:8080"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
