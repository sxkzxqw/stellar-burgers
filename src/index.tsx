import React from 'react';
import ReactDOM from 'react-dom/client';
import 'overlayscrollbars/overlayscrollbars.css';
import './index.css';
import Favicon from 'react-favicon';
import App from './components/UI/App/App';
import { store } from './services/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  // <React.StrictMode>
  <>
    <Favicon url='https://cdn.onlinewebfonts.com/svg/download_477971.png' />
    <Provider store={store}>
      <BrowserRouter basename='/stellar-burgers'>
        <App />
      </BrowserRouter>
    </Provider>
  </>
  // </React.StrictMode>
);
