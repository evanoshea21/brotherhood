import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import { Context } from '../globals/context.js';
import classes from '../styles/Join.module.css';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })
import TextField from '@mui/material/TextField';
import { useS3Upload } from "next-s3-upload";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { createUser } from '../globals/API.js';
import CropModal from '../components/CropModal.js';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function Join() {

  const [dob, setDob] = React.useState();
  const [fnameErr, setFnameErr] = React.useState(false);
  const [lnameErr, setLnameErr] = React.useState(false);
  const [cityErr, setCityErr] = React.useState(false);
  const [emailErr, setEmailErr] = React.useState(false);
  const [fileErr, setFileErr] = React.useState(false);
  const [passErr, setPassErr] = React.useState(false);
  const [passMatchErr, setPassMatchErr] = React.useState(false);


  //INITIAL file
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
    setLocalUrl(URL.createObjectURL(file));
    setPreviewUrl(URL.createObjectURL(file));
  };

  //upload to s3 AND set s3Url state
  let uploadFileToS3 = async () => {
    if(file) {
      let { url } = await uploadToS3(file);
      setS3Url(url);
    }
  };

  function createTheUser() {
    createUser()
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

   /* user obj to post
     email, fname, lname, city, pic, date_of_birth, join_date
     dates: YYYY-MM-DD */
  const fnameRef = React.useRef(null);
  const lnameRef = React.useRef(null);
  const cityRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passRef = React.useRef(null);
  const passRef2 = React.useRef(null);

  function submitForm() {
    //get form data
    let fname = fnameRef.current.value;
    let lname = lnameRef.current.value;
    let city = cityRef.current.value;
    let email = emailRef.current.value;
    let pass = passRef.current.value;
    let pass2 = passRef.current.value;
    //pic = s3url after upload; 'file' first
    let date_of_birth = dob;
    let join_date = formatDate();
    let oneError = false;

//Verify all fields have inputs
    if(!fname) { setFnameErr(true); oneError = true;}
    if(!lname) { setLnameErr(true); oneError = true;}
    if(!city) { setCityErr(true); oneError = true;}
    if(!email) { setEmailErr(true); oneError = true;}
    if(!fileName) { setFileErr(true); oneError = true;}
    if(!pass || !pass2) { setPassErr(true); oneError = true;}
    if(pass !== pass2) { setPassMatchErr(true); oneError = true;}

    if(oneError) {console.log('input empty'); return}

    let obj = {fname,lname,city,email, pass ,join_date,date_of_birth}
    console.log('User input Obj\n', obj);



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

      <h1>JOIN: </h1>

      {/* IMAGE PICK AND CROP  */}
      <div className={classes.imagePick} >
        <FileInput onChange={setInitialFile} />

        <Button sx={{my: '10px', py: '10px', width: '160px', display: 'flex', justifyContent: 'space-between'}} onClick={openFileDialog} variant="contained" component="label"> Add Picture
        <PhotoCamera />
        </Button>

      {/* RESIZE / CROP IMAGE MODAL  */}

      <div className={classes.imgPreview}>
        <Avatar alt="Remy Sharp" src={previewUrl}
        sx={{ width: 154, height: 154 }}
        />
        {localUrl && (
        <div className={classes.cropBtn}>
          <CropModal setPreviewUrl={setPreviewUrl} fileName={fileName} localUrl={localUrl} setFile={setFile} />
        </div>
        )}
      </div>
    </div>
    {/* END IMAGE PICK  */}


    {/* user obj to post
     email, fname, lname, city, pic, bio, date_of_birth, join_date
     dates: YYYY-MM-DD */}
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

      <button className={classes.submitBtn}  type='submit'>Submit</button>

    </form>
    </div>

    </div>
    </>

  )
}
