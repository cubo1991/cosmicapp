import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import store from './Redux/Store';
// || 'http://localhost:3000/api'
// https://us-central1-cosmicappback.cloudfunctions.net/app/api
// 'https://cosmicapp-api.onrender.com/api'
axios.defaults.baseURL=  'https://us-central1-cosmicappback.cloudfunctions.net/app/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
);

reportWebVitals();
