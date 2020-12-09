import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: false,
  login: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthenticate, setisAuthenticate] = useState(false);

  const authHandler = () => {
    setisAuthenticate(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth: isAuthenticate, login: authHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
