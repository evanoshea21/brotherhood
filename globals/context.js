import React from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase.js';
import axios from 'axios';

const Context = React.createContext();

const ContextProvider = ({children}) => {
  const [userData, setUserData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [testContext, setTestContext] = React.useState('im global');

  //listerer for sign in
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        if(!userData?.email) {
          console.log('loggin in with user...', user)
          setIsLoading(true);

          axios({url: `/api/users/${user.email}`, method: 'GET'})
          .then(res => setUserData(res.data[0]))
          .catch(err => console.log(err));
        } else {
          console.log('..userData already exists..\n\n')
        }

      } else {
        console.log('LOGGING OUT...............\n\n')
        setUserData({});
      }
    })
    return () => {unsubscribe()}
  }, []);


  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      console.log('Success Sign Out');
    })
    .catch(err => console.log('Error sign out', err))
  }

  return (
    <Context.Provider value={{
      userData,
      setUserData,
      isLoading,
      testContext,
      handleSignOut
      }}>
      {children}
    </Context.Provider>
  )
};

export {ContextProvider, Context};