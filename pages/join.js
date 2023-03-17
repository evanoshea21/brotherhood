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
import { getUsers } from '../globals/API.js';




import CropModal from '../components/CropModal.js';



export default function Join() {
  // this is s3 url returned
  const [s3Url, setS3Url] = React.useState();
  //initial file
  const [localUrl, setLocalUrl] = React.useState();
  const [previewUrl, setPreviewUrl] = React.useState();
  const [fileName, setFileName] = React.useState();
  //this is to be updated by crop...
  const [file, setFile] = React.useState();

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const router = useRouter();
  const routePage = (path) => {
    router.push(path);
  }


  React.useEffect(() => {
    console.log('s3 url: ', s3Url);
  },[s3Url]);

  //saves file object, and sets local Image Url
  let setInitialFile = async file => {
    console.log('OG FILE HERE: ', file);
    setFile(file);
    setFileName(file.name);
    setLocalUrl(URL.createObjectURL(file));
    setPreviewUrl(URL.createObjectURL(file));

  };

  //uploads image to S3 via image state saved
  let uploadFileToS3 = async () => {
    let { url } = await uploadToS3(file);
    setS3Url(url);
  };

  function getTheUsers() {
    getUsers()
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  return (
    <>
    <div className={classes.main}>
      <h1>JOIN: </h1>
      <button onClick={getTheUsers}>GET USERS</button>






      {/* IMAGE PICK AND CROP  */}
      <div>
      <FileInput onChange={setInitialFile} />
      {/* <button >Choose file</button> */}
      <Button sx={{py: '10px', width: '190px', display: 'flex', justifyContent: 'space-between'}} onClick={openFileDialog} variant="contained" component="label">
        Choose Picture
        <PhotoCamera />
      </Button>
      <button onClick={uploadFileToS3}>Upload file</button>

      {localUrl && (
      <div className={classes.imgPreview}>
        <Avatar alt="Remy Sharp" src={previewUrl}
        sx={{ width: 154, height: 154 }}
        />
        {/* <img src={previewUrl} /> */}
        <CropModal setPreviewUrl={setPreviewUrl} fileName={fileName} localUrl={localUrl} setFile={setFile} />
      </div>

      )}
    </div>

    {/* END IMAGE PICK  */}











      <div className={classes.form}>
        <TextField color='secondary' InputLabelProps={{
      style: { color: '#800A01' }}} label="Name" variant="outlined" />
        <TextField color='secondary' InputLabelProps={{
      style: { color: '#800A01' }}} id="outlined-basic" label="Age" variant="outlined" />
        <TextField color='secondary' InputLabelProps={{
      style: { color: '#800A01' }}} id="outlined-basic" label="City" variant="outlined" />
      </div>
    </div>
    </>

  )
}
