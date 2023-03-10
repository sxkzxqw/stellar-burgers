import React, {useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Content from '../Content/Content';
import api from '../../../API/Burgers';
import './App.module.css';

function App() {
  const [ingredients, setIngredients] = useState([]);
  
  useEffect(function(){
      api.getAll().then(({data}) => { 
        setIngredients(data);
      }).catch(err => {
        console.error(err);
      })
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <Content ingredients={ingredients} />
    </div>
  );
}

export default App;
