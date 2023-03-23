import React, {useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Content from '../Content/Content';
import './App.module.css';

function App() {

  return (
    <div className="App">
      <AppHeader />
      <Content />
    </div>
  );
}

export default App;
