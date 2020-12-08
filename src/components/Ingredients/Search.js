import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const {onLoad} = props
  const [filteredText, setFilteredText] = useState('')

  useEffect(()=>{
    let query = filteredText.length > 0 ? `?orderBy="title"&equalTo="${filteredText}"` : ''
    console.log(query);
    fetch('https://react-hooks-3e280-default-rtdb.firebaseio.com/ingredient.json'+query)
    .then((response)=>{
      return response.json()
    }).then((response)=>{

      const data = []
      for(let key in response){
        data.push({id:key, title:response[key].title, amount:response[key].amount})
      }
      onLoad(data)
    })
    
  }, [filteredText, onLoad])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input onChange={(event)=>setFilteredText(event.target.value)}
           type="text" />
        </div>
      </Card>
    </section>
  );
});

export default Search;
