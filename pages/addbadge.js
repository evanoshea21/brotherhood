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



export default function AddBadge() {
  const router = useRouter();
  const { setBadges } = React.useContext(Context);

  // Form ERROR Handling
  const [displaySuccess, setDisplaySuccess] = React.useState(false);
  const [charsLeft, setCharsLeft] = React.useState(400);
  const [descText, setDescText] = React.useState('');
  const [errorLabel, setErrorLabel] = React.useState('');

  const [nameErr, setNameErr] = React.useState();
  const [rundownErr, setRundownErr] = React.useState();
  const [descErr, setDescErr] = React.useState();
  const [imgPathErr, setImgPathErr] = React.useState();

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
      .then(res => {
        console.log('Posted Badge?\n', res.data);
        setDisplaySuccess(true);
        axios({url: `/api/badges`, method: 'GET'})
        .then(res => setBadges(res.data))
        .catch(err => console.log('error getting badges after adding...', err));
      })
      .catch(err => console.error(err))

  }

  return (
    <>
    <div className={classes.main}>

      <h1>Add Badge </h1>

    <div className={classes.formContainer}>
    <form className={classes.badgeForm}  onSubmit={e => {e.preventDefault(); submitForm()}}>
      <TextField
      color='secondary'
      error={nameErr}
      InputProps={{onFocus: () => setNameErr(false)}}
      InputLabelProps={{style: { color: '#800A01' }}}
      label="Name"
      inputRef={nameRef}
      variant="outlined"
      sx={{my: '20px', width: '270px'}}
      />
      <TextField
      color='secondary'
      error={rundownErr}
      InputProps={{onFocus: () => setRundownErr(false)}}
      InputLabelProps={{style: { color: '#800A01' }}}
      label="Rundown"
      inputRef={rundownRef}
      variant="outlined"
      sx={{my: '20px', width: '270px'}}
      />
      <textarea
        className={classes.textArea}
        maxLength="400"
        onChange={(e) => {
          setDescText(e.target.value);
          setCharsLeft(400 - e.target.value.length);
        }}
      />
      <p>{charsLeft} Characters Left</p>
      <TextField
      color='secondary'
      error={imgPathErr}
      InputProps={{onFocus: () => setImgPathErr(false)}}
      InputLabelProps={{style: { color: '#800A01' }}}
      label="Image Path (/badges/img.png)"
      inputRef={imgPathRef}
      variant="outlined"
      sx={{my: '20px', width: '270px'}}
      />
      <p>{errorLabel}</p>
      {displaySuccess && (
        <p style={{color: 'green'}}>Successfully Posted Badge</p>
      )}

      {displaySuccess ? (
        <>
        <div onClick={() => router.push('/badges')}  className={classes.submitBtn2}>Return to Badges</div>
        <div onClick={() => setDisplaySuccess(false)}  className={classes.submitBtn2}>Add Another</div>
        </>
      ) : (
        <button className={classes.submitBtn}  type='submit'>Submit</button>
      )}

    </form>
    </div>

    </div>
    </>

  )
}
