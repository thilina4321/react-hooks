import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import {AuthContext} from './context/AuthContext'
import Auth from './components/Auth'


const App = props => {
  const authContext = useContext(AuthContext).isAuth
  return authContext ? <Ingredients /> : <Auth/>;
};

export default App;
