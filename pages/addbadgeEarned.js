import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Context } from '../globals/context.js';
import classes from '../styles/AddBadge.module.css';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })
import {Avatar, Button, TextField, Typography} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import axios from 'axios';

export default function AddBadgeEarned() {
  const router = useRouter();

  const [userObj, setUserObj] = React.useState({})

  const [storyText, setStoryText] = React.useState('');
  // Form ERROR Handling
  const [errorLabel, setErrorLabel] = React.useState('');
  const [nameErr, setNameErr] = React.useState();
  const [rundownErr, setRundownErr] = React.useState();
  const [descErr, setDescErr] = React.useState();
  const [imgPathErr, setImgPathErr] = React.useState();


  React.useEffect(() => {
    if(router.isReady) {
      let {fname, lname, pic} = router.query;
      let queryUserObj = {fname, lname, pic};
      setUserObj(queryUserObj);
    }
  },[router.query]);



  const nameRef = React.useRef(null);
  const rundownRef = React.useRef(null);
  const descRef = React.useRef(null);
  const imgPathRef = React.useRef(null);
  function submitForm() {

    //get form data
    let name = nameRef.current.value;
    let rundown = rundownRef.current.value;
    let imgPath = imgPathRef.current.value;

    // FORM ERROR HANDLING
    let oneError = {};
    let passMatchCheck = false;
    if(!name) { setNameErr(true); oneError.name = true;}
    if(!rundown) { setRundownErr(true); oneError.rundown = true;}
    if(!descText.length) { setDescErr(true); oneError.desc = true;}
    if(!imgPath) { setImgPathErr(true); oneError.desc = true;}

    if(Object.keys(oneError).length) {console.log('input error', oneError); setErrorLabel('field is empty'); return}
    console.log('got passed form error check...');
    setErrorLabel('');

    // POST BADGE

      let postObj = {
        type: 'badge',
        name,
        requirements: '1, 2, 3',
        rundown,
        description: descText,
        image_path: imgPath,
      };

      axios({url: '/api/badges', method: 'POST', data: postObj})
      .then(res => console.log('Posted Badge?\n', res.data))
      .catch(err => console.error(err))

  }

  return (
    <>
    <div className={classes.main}>

      <h1>Add Badge Earned for {userObj.fname}</h1>

    <div className={classes.formContainer}>
    <form className={classes.badgeForm}  onSubmit={e => {e.preventDefault(); submitForm()}}>
      <textarea
        className={classes.textArea}
        maxLength="400"
        onChange={(e) => {
          setStoryText(e.target.value);
        }}
      />

      <button className={classes.submitBtn}  type='submit'>Submit</button>

    </form>
    </div>

    </div>
    </>

  )
}
