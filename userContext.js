import React, { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
      emailID: '',
      firstName: '',
      lastName: '',
      userID: ''
  });

  return (
    <UserContext.Provider
      value={{
       userData,
       setUserData
      }}
    >
      {children}
    </UserContext.Provider>
  )
}