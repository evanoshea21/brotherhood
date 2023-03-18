import React from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase.js';

const Context = React.createContext();

const ContextProvider = ({children}) => {
  const [userData, setUserData] = React.useState({});
  // const [userToken, setUserToken] = React.useState('null');
  const [isLoading, setIsLoading] = React.useState(false);
  const [testContext, setTestContext] = React.useState('im global');

  //listerer for sign in
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        console.log('loggin in with user...', user)
        setIsLoading(true);


        // getSetUserData(user.email)
        // .then(res => setIsLoading(false))
        // .catch(err => console.log('couldnt getSetUser...'))
      } else {
        console.log('logging out...')
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