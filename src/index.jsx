import React from 'react';
import ReactDOM from 'react-dom/client';
import 'overlayscrollbars/overlayscrollbars.css';
import './index.css';
import Favicon from 'react-favicon';
import App from './components/UI/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Favicon url='https://cdn.onlinewebfonts.com/svg/download_477971.png' />
    <App />
  </React.StrictMode>
);
