import React, {useState, useEffect } from 'react';
import api from './API/Burgers';
import './App.css';
import AppHeader from './components/UI/AppHeader/AppHeader';
import Content from './components/UI/Content/Content';

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
