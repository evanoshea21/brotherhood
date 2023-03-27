import React from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase.js';
import axios from 'axios';

const Context = React.createContext();

const ContextProvider = ({children}) => {
  const [userData, setUserData] = React.useState({});
  const [badges, setBadges] = React.useState([]);
  const [badgesEarned, setBadgesEarned] = React.useState([]);

  const [testContext, setTestContext] = React.useState('im global');

  //listerer for sign in
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        if(!userData?.email) {
          console.log('loggin in with user...', user)
          // setIsLoading(true);

          axios({url: `/api/users/email/${user.email}`, method: 'GET'})
          .then(res => setUserData(res.data[0]))
          .catch(err => console.log('ERROR GETTING USER', err));
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

  React.useEffect(() => {
    //set userdata

    // set all badges
    axios({url: `/api/badges`, method: 'GET'})
    .then(res => setBadges(res.data))
    .catch(err => console.error(err))

    //set badges_earned
    axios({url: `/api/badges/fromuser`, method: 'GET'})
    .then(res => setBadgesEarned(res.data))
    .catch(err => console.error(err))
  },[]);


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
      // isLoading,
      testContext,
      badges,
      setBadges,
      badgesEarned,
      setBadgesEarned,
      handleSignOut
      }}>
      {children}
    </Context.Provider>
  )
};

export {ContextProvider, Context};