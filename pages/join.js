import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Context } from '../globals/context.js';
import classes from '../styles/Join.module.css';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })
import { useS3Upload } from "next-s3-upload";
import {Avatar, Button, TextField, Typography} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CropModal from '../components/CropModal.js';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import CircularProgress from '@mui/material/CircularProgress';
import { handleOptimization } from '../globals/utils.js';



export default function Join() {
  const router = useRouter();
  const { setUserData } = React.useContext(Context);
  const [progress, setProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  // Form ERROR Handling
  const [errorLabel, setErrorLabel] = React.useState('');

  const [dob, setDob] = React.useState();
  const [dobErr, setDobErr] = React.useState(false);
  const [fnameErr, setFnameErr] = React.useState(false);
  const [lnameErr, setLnameErr] = React.useState(false);
  const [cityErr, setCityErr] = React.useState(false);
  const [emailErr, setEmailErr] = React.useState(false);
  const [fileErr, setFileErr] = React.useState(false);
  const [passErr, setPassErr] = React.useState(false);
  const [passMatchErr, setPassMatchErr] = React.useState(false);


//IMAGE STATE FOR UPLOAD
  //initial file
  const [localUrl, setLocalUrl] = React.useState();
  const [previewUrl, setPreviewUrl] = React.useState();
  const [fileName, setFileName] = React.useState();
  //updated CROP FILE...
  const [file, setFile] = React.useState();
  // this is s3 url returned
  const [s3Url, setS3Url] = React.useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  React.useEffect(() => {
    console.log('s3 url: ', s3Url);
  },[s3Url]);

  let setInitialFile = async file => {
    // console.log('OG FILE HERE: ', file);
    setFile(file);
    setFileName(file.name);
    let optimizedImage = await handleOptimization(file);

      setLocalUrl(URL.createObjectURL(optimizedImage));
    // setLocalUrl(URL.createObjectURL(file));
    setPreviewUrl(URL.createObjectURL(file));
  };

  //upload to s3 AND set s3Url state
  let uploadFileToS3 = async () => {
    if(!fileName) return null;
      if(file) {
        try {
          //OPTIMIZE IMAGE HERE, THENNNN UPLOAD IT
          let optimizedImage = await handleOptimization(file);
          let { url } = await uploadToS3(optimizedImage);
          return url;
          setS3Url(url);
        } catch (err) {
          return err;
        }
      }
  };

   /* user obj to post
     email, fname, lname, city, pic, date_of_birth, join_date
     dates: YYYY-MM-DD */
  const fnameRef = React.useRef(null);
  const lnameRef = React.useRef(null);
  const cityRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passRef = React.useRef(null);
  const passRef2 = React.useRef(null);

  const auth = getAuth();
  // setPersistence(auth, browserSessionPersistence)

  async function submitForm() {
    if(isLoading) {console.log('still loading'); return;}
    setIsLoading(true);
    /* STEPS:
    (1) verify form entries, return if invalid
    (2) try to upload to FB, if fail return failure message for user
    (3) upload image to s3, with response url, post to database
    */
    setProgress(25);

    //get form data
    let fname = fnameRef.current.value;
    let lname = lnameRef.current.value;
    let city = cityRef.current.value;
    let email = emailRef.current.value;
    let pass = passRef.current.value;
    let pass2 = passRef2.current.value;
    let date_of_birth = dob;
    let join_date = formatDate();

    // FORM ERROR HANDLING
    let oneError = {};
    let passMatchCheck = false;
    if(!fname) { setFnameErr(true); oneError.fname = true;}
    if(!lname) { setLnameErr(true); oneError.lname = true;}
    if(!city) { setCityErr(true); oneError.city = true;}
    if(!email) { setEmailErr(true); oneError.email = true;}
    // if(!fileName) { setFileErr(true); oneError.fileName = true;}
    if(!dob) { setDobErr(true); oneError.dob = true;}
    if(!pass || !pass2) { setPassErr(true); oneError.pass = true;}
    if(pass !== pass2) { setPassErr(true); setErrorLabel("passwords don't match"); setIsLoading(false);
    setProgress(0); return;}
    if(Object.keys(oneError).length) {console.log('input error', oneError); setErrorLabel('field is empty'); setIsLoading(false);
    setProgress(0); return}
    console.log('got passed form error check...');
    setErrorLabel('');

    // Test Server running -> FIREBASE CHECK -> s3 upload -> DB post user
    try {
      let serverResponse = await axios({url: '/api/test', method: 'GET'});
      console.log('server response, ', serverResponse.data);

      let firebaseResponse = await signUpUserFB(email, pass);
      setProgress(50);
      console.log('FB sucess:', firebaseResponse);

      let s3FileUrl = await uploadFileToS3();
      setProgress(75);

      let userObj = {fname,lname,city, email, join_date, date_of_birth}

      if(s3FileUrl) {
        userObj.pic = s3FileUrl;
      }
      console.log('user object POST: ', userObj)

        //post to db
      let postResponse = await axios({url: '/api/users', method: 'POST', data: userObj});
      console.log('db success, added user. response: ', postResponse.data)

      let getUser = await axios({url: `/api/users/email/${email}`, method: 'GET'});
      setProgress(100);
      setUserData(getUser.data[0]);
      router.replace('/community');
      setIsLoading(false);
      setProgress(0);
    } catch(err) {
      setIsLoading(false);
      setProgress(0);
      console.log('FB/S3/DB ERR response', err);
      /* CODES:  (err.code)
      1. auth/email-already-in-use
      2. auth/weak-password
      */
     switch(err.code) {
      case 'auth/email-already-in-use':
        setErrorLabel('email already in use')
        setEmailErr(true);
        break;
        case 'auth/weak-password':
        setPassErr(true);
        setErrorLabel('password is too weak')
        break;
      case 'auth/invalid-email':
        setErrorLabel('invalid email');
        setEmailErr(true);
        break;
      default:
        setErrorLabel('server error... try again later');
        setEmailErr(true);
     }
    }
  }

  function signUpUserFB(email, pass) {
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        resolve(userCredential);
      })
      .catch((error) => {
        const code = error.code;
        const message = error.message;
        reject({code, message})
      });
    })
  }

  function formatDate(dateStr) {
    let newDate = dateStr ? new Date(dateStr) : new Date();
    let month = (newDate.getMonth() + 1)
    let date = newDate.getDate()
    if(month < 10) {
      month = '0' + month;
    }
    if(date < 10) {
      date = '0' + date;
    }
    let finaldate = newDate.getFullYear() + '-' + month + '-' +  date;
    return finaldate;
  }

  function setYourDob(dateStr) {
    let date = formatDate(dateStr);
    console.log('dob', date);
    setDob(date);
  }

  return (
    <>
    <div className={classes.main}>

      <h1 className={classes.title}>Join Today</h1>
      <h3 style={{textAlign: 'center', fontSize: '2rem', color: 'red'}}>Note: the servers are currently not operational</h3>

      <div className={classes.welcome}>
        {/* <p className={classes.welcomePara} >If you have any questions, reach out to us! <br/>Otherwise, feel free to Join by registering below. </p> */}
      </div>

      {/* IMAGE PICK AND CROP  */}
      <div className={`${classes.imagePick} ${previewUrl ? classes.growAnim : ''}`} >
        <FileInput onChange={setInitialFile} />

        <Button sx={{my: '15px', py: '10px', width: '160px', display: 'flex', justifyContent: 'space-between'}} onClick={openFileDialog} variant="contained" component="label"> Add Picture
        <PhotoCamera />
        </Button>

      {/* RESIZE / CROP IMAGE MODAL  */}
      <div className={`${classes.imgPreview} ${previewUrl ? classes.fadeInAnim : ''}`}>
        <Avatar alt="Remy Sharp" src={previewUrl || '/defaultProfilePic.jpeg'}
        sx={{ width: 154, height: 154 }}
        />
        {localUrl && (
        <div className={`${classes.cropBtn} ${previewUrl ? classes.fadeInAnim : ''}`}>
          <CropModal setPreviewUrl={setPreviewUrl} fileName={fileName} localUrl={localUrl} setFile={setFile} />
        </div>
        )}
      </div>
    </div>
    {/* END IMAGE PICK  */}

    <div className={classes.formContainer}>
    <form className={classes.joinForm}  onSubmit={e => {e.preventDefault(); submitForm()}}>
      <TextField
      color='secondary'
      error={fnameErr}
      helperText=''
      InputProps={{onFocus: () => setFnameErr(false)}}
      InputLabelProps={{style: { color: '#800A01' }}}
      label="First Name"
      inputRef={fnameRef}
      variant="outlined" />
      <TextField
      color='secondary'
      error={lnameErr}
      InputProps={{onFocus: () => setLnameErr(false)}}
      InputLabelProps={{style: { color: '#800A01' }}}
      label="Last Name"
      inputRef={lnameRef}
      variant="outlined" />
      <TextField
      color='secondary'
      error={emailErr}
      InputProps={{onFocus: () => setEmailErr(false)}}
      InputLabelProps={{style: { color: '#800A01' }}}
      label="Email"
      inputRef={emailRef}
      type='email'
      variant="outlined" />
      <TextField
      color='secondary'
      error={passErr}
      InputProps={{onFocus: () => setPassErr(false)}}
      InputLabelProps={{style: { color: '#800A01' }}}
      label="Password"
      inputRef={passRef}
      type='password'
      variant="outlined" />
      <TextField
      color='secondary'
      error={passErr}
      InputProps={{onFocus: () => setPassErr(false)}}
      InputLabelProps={{style: { color: '#800A01' }}}
      label="Verify Password"
      inputRef={passRef2}
      type='password'
      variant="outlined" />
      <TextField
      color='secondary'
      error={cityErr}
      InputProps={{onFocus: () => setCityErr(false)}}
      InputLabelProps={{style: { color: '#800A01' }}}
      label="City"
      inputRef={cityRef}
      variant="outlined" />
      <DatePicker label="Date of Birth"
      onChange={(e) => { setYourDob(e.$d)}}
      />
      <Typography fontSize='1rem' color='error' variant="h6" component="h6">
        {errorLabel}
      </Typography>
      {!isLoading ? (
        <button className={classes.submitBtn}  type='submit'>Submit</button>
        ) : (
          <button className={classes.submitBtn3}  type='submit'>
            <CircularProgress variant="determinate" value={progress} />
          </button>
      )}

    </form>
    </div>

    </div>
    </>

  )
}
