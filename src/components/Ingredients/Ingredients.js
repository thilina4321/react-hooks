import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {

  const [ingredients, setingredients] = useState([])

  const onAddIngredientsHandler = (ingreds)=>{
    setingredients(prevState=>[
      ...prevState, {id:Math.random().toString(), ...ingreds}
    ]
    )
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredients={onAddIngredientsHandler}/>

      <section>
        <Search />
        <IngredientList onRemoveItem={()=>null}
         ingredients={ingredients}/>
        {/* Need to add list here! */}
      </section>
    </div> 
  );
}

export default Ingredients;
