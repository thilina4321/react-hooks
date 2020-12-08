import React, {useState,useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'
import LoadingIndicator from '../UI/LoadingIndicator'

function Ingredients() {

  const [ingredients, setIngredients] = useState([])
  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)


  const addIngredientHandler = async(ings)=>{
    setisLoading(true)
    fetch('https://react-hooks-3e280-default-rtdb.firebaseio.com/ingredient.jon', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(ings)
    }).then((response)=>{
      setisLoading(false)

      return response.json()
    }).then((response)=>{
      setIngredients(preIngs=>[...preIngs, {...ings, id:response.name}])
      
    }).catch(e=>{
      setisLoading(false)
      seterror('Something went wrong')
    })

    

  }

  const deleteIngredintHandler = (id)=>{
    const ings = ingredients.filter(ing=> ing.id !== id)
    fetch(`https://react-hooks-3e280-default-rtdb.firebaseio.com/ingredient/${id}.json`,{
      method:'DELETE',
    }).then(()=>{
      setIngredients(ings)

    })

  }

  const filteredData = useCallback((data)=>{
    setIngredients(data)
  }, [])

  const closeHandler = ()=>{
    seterror(null)
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredients={addIngredientHandler}/>

      {isLoading && <LoadingIndicator /> }
      {error && <ErrorModal onClose={closeHandler}> {error} </ErrorModal>}
      <section>
        <Search onLoad={filteredData}/>
        <IngredientList
        onDelete = {deleteIngredintHandler}
         ingredients={ingredients}/>
        {/* Need to add list here! */}
      </section>
    </div> 
  );
}

export default Ingredients;
