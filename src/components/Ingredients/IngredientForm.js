import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  console.log('Render ingredients form');

  const [enterTitle, setEnterTitle] = useState('')
  const [enterAmount, setEnterAmount] = useState('')
  
  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredients({title:enterTitle, amount:enterAmount})
    setEnterTitle('')
    setEnterAmount('')
    // ...
  };
 
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input value={enterTitle}
            onChange={(event)=>setEnterTitle(event.target.value)}
             type="text" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input value={enterAmount}
            onChange={(event)=>setEnterAmount(event.target.value)}
             type="number" id="amount" />
          </div>
          
          <div className="ingredient-form__actions">
            <button onClick={submitHandler}
            type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
