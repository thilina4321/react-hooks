import React, {useState,useCallback, useReducer} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'
import LoadingIndicator from '../UI/LoadingIndicator'

const ingredientReducer = (currentIngredients, action)=>{
  switch(action.type){
    case 'SET':return action.ingredients
    case 'ADD':return [...currentIngredients, action.ingredient]
    case 'DELETE':return action.ingredients
    default : throw new Error('Should not go there')
  }
}

const httpReducer = (currentHttp, action)=>{
  switch(action.type){
    case 'SEND':return {loading:true, error:null}
    case 'RESPONSE':return { ...currentHttp, loading:false}
    case 'ERROR':return {loading:false, error:'Something went wrong'}
    case 'CLEAR':return {loading:false, error:null}
    default: throw new Error('Should not go there')
  }
}

function Ingredients() {

  const [ingredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading:false, error:false})
  // const [ingredients, setIngredients] = useState([])
  // const [error, seterror] = useState(null)
  // const [isLoading, setisLoading] = useState(false)


  const addIngredientHandler = useCallback( async(ings)=>{
    // setisLoading(true)
    dispatchHttp({type:'SEND'})
    fetch('https://react-hooks-3e280-default-rtdb.firebaseio.com/ingredient.json', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(ings)
    }).then((response)=>{
      // setisLoading(false)
      dispatchHttp({type:'RESPONSE'})


      return response.json()
    }).then((response)=>{

      dispatch({
        type:'ADD',
        ingredient:{...ings, id:response.name}
      })

      // setIngredients(preIngs=>[...preIngs, {...ings, id:response.name}])
      
    }).catch(e=>{
      dispatchHttp({type:'ERROR'})
    })

    

  }, [])

  const deleteIngredintHandler = (id)=>{
    const ings = ingredients.filter(ing=> ing.id !== id)
    fetch(`https://react-hooks-3e280-default-rtdb.firebaseio.com/ingredient/${id}.json`,{
      method:'DELETE',
    }).then(()=>{

      dispatch({
        type:'DELETE',
        ingredients:ings
      })
      // setIngredients(ings)

    })

  }

  const filteredData = useCallback((data)=>{
    dispatch({
      type:'SET',
      ingredients:data
    })
  }, [])

  const closeHandler = ()=>{
    // seterror(null)
    dispatchHttp({type:'CLEAR'})
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredients={addIngredientHandler}/>

      {httpState.loading && <LoadingIndicator /> }
      {httpState.error && <ErrorModal onClose={closeHandler}> {httpState.error} </ErrorModal>}
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
