import React from 'react';
import { Inter } from 'next/font/google'
import { Context } from '../globals/context.js';
import classes from '../styles/Join.module.css';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })
import {Button, TextField, Typography} from '@mui/material';
import axios from 'axios';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";


export default function Join() {
  const router = useRouter();
  const {setUserData} = React.useContext(Context);
  const [showReset, setShowReset] = React.useState(false);
  const [resetLabel, setResetLabel] = React.useState('Forgot Password?');
  const [successLabel, setSuccessLabel] = React.useState('');

  // Form ERROR Handling
  const [errorLabel, setErrorLabel] = React.useState('');
  const [emailErr, setEmailErr] = React.useState(false);
  const [passErr, setPassErr] = React.useState(false);

  //refs
  const emailRef = React.useRef(null);
  const passRef = React.useRef(null);

  const auth = getAuth();
  // setPersistence(auth, browserSessionPersistence)

  async function submitForm() {

    //get form data
    let email = emailRef.current.value;
    let pass = passRef.current.value;

    // FORM ERROR HANDLING
    let oneError = {};
    if(!email) { setEmailErr(true); oneError.email = true;}
    if(!pass) { setPassErr(true); oneError.pass = true;}
    if(Object.keys(oneError).length) {console.log('input error', oneError); setErrorLabel('a field is empty'); return}

    console.log('got passed form error check...');
    setErrorLabel('');

    // FIREBASE CHECK -> s3 upload -> DB post user
    try {
      let firebaseResponse = await signInWithEmailAndPassword(auth, email, pass);
      console.log('FB sucess:', firebaseResponse)

      //get user from db
      let getResponse = await axios({url: `/api/users/email/${email}`, method: 'GET'});
      console.log('got user from db:\n', getResponse.data);

      setUserData(getResponse.data[0]);
      router.replace('/community');

    } catch(err) {
      console.log('getting to err: ', err);
      console.log('FB / DB sign in', err.code);
      /* CODES:  (err.code)
      1. auth/user-not-found
      2. auth/wrong-password
      */

     switch(err.code) {
      case 'auth/user-not-found':
        setErrorLabel("email doesn't exist")
        setEmailErr(true);
        break;
        case 'auth/wrong-password':
        setPassErr(true);
        setErrorLabel('password incorrect')
        break;
        default:
          setErrorLabel("sorry, there's an issue signing into your account incorrect")

     }

    }
  }

  function sendResetLink() {
    let email = emailRef.current.value;
    let actionCodeSettings, displayName;
    //check if email exists...

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setErrorLabel('');
        setSuccessLabel('Email link sent!');
        // Password reset email sent!
        // ..
      })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('password reset email FAIL, ', errorCode);

      if(errorCode === 'auth/user-not-found') {
        setErrorLabel('email not found');
      }
      if(errorCode === 'auth/invalid-email') {
        setErrorLabel('invalid email');
      }
      // ..
    });

  }

  return (
    <>
    <div className={classes.main}>

      <h1>Sign In</h1>

    <div className={classes.formContainer}>
    <form className={classes.joinForm}  onSubmit={e => {e.preventDefault(); submitForm()}}>

      <TextField
      color='secondary'
      error={emailErr}
      InputProps={{onFocus: () => setEmailErr(false)}}
      InputLabelProps={{style: { color: '#800A01' }}}
      label="Email"
      inputRef={emailRef}
      type='email'
      variant="outlined" />
      {!showReset && (
        <TextField
        color='secondary'
        error={passErr}
        InputProps={{onFocus: () => setPassErr(false)}}
        InputLabelProps={{style: { color: '#800A01' }}}
        label="Password"
        inputRef={passRef}
        type='password'
        variant="outlined" />
      )}

      <div className={classes.passResetLink}>
      <Typography onClick={() => {
        if(!showReset) {
          setShowReset(true); setResetLabel('Send Link')
        }
        else {sendResetLink()}
        }}  fontSize='1rem' color='var(--primary-color)' variant="h6" component="h6" sx={{textAlign: 'center'}}>
        {resetLabel}
      </Typography>
      </div>
      <Typography fontSize='1rem' color='error' variant="h6" component="h6" sx={{textAlign: 'center'}}>
        {errorLabel}
      </Typography>
      <Typography fontSize='1rem' color='green' variant="h6" component="h6" sx={{textAlign: 'center'}}>
        {successLabel}
      </Typography>
      {!showReset ? (
        <button className={classes.submitBtn}  type='submit'>Submit</button>
        ) : (
        <div onClick={() => {
          setShowReset(false); setErrorLabel(''); setResetLabel('Forgot Password?'); setSuccessLabel('');
        }}  className={classes.submitBtn2}>Back to Login</div>
      )}

    </form>
    </div>

    </div>
    </>

  )
}
