import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios';
// import { Context } from '../globals/context.js';
import classes from '../styles/Join.module.css';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })
import TextField from '@mui/material/TextField';
import { useS3Upload } from "next-s3-upload";
import { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";



export default function Join() {
  const [imageUrl, setImageUrl] = React.useState();
  const [localUrl, setLocalUrl] = React.useState();
  const [file, setFile] = React.useState();
  const [fileName, setFileName] = React.useState();

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const router = useRouter();
  const routePage = (path) => {
    router.push(path);
  }

  // CROPPER STUFF
  const cropperRef = useRef(null);
  const onCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
    let blob = cropper.getCroppedCanvas().toDataURL();
    const resultFile = new File([blob], fileName,{type:file.type,lastModified:(new Date().getTime())});
    console.log('resultFile: ', resultFile);
    setFile(resultFile);
    // let url = URL.createObjectURL(resultFile);
    // console.log('result file url: ', url);

  };





  React.useEffect(() => {
    console.log('s3 url: ', imageUrl);
    console.log('local url: ', localUrl);
  },[imageUrl, localUrl]);

  //saves file object, and sets local Image Url
  let handleFileChange = async file => {
    console.log('FILE HERE: ', file);
    setFile(file);
    setFileName(file.name);
    setLocalUrl(URL.createObjectURL(file));

  };

  //uploads image to S3 via image state saved
  let uploadFileToS3 = async () => {
    let { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  return (
    <>
    <div className={classes.main}>
      <h1>JOIN</h1>

      {/* IMAGE PICK AND CROP  */}
      <div>
      <FileInput className={classes.uploadBtn}  onChange={handleFileChange} />

      <button onClick={openFileDialog}>Choose file</button>
      <button onClick={uploadFileToS3}>Upload file</button>

      {localUrl && (
      <div className={classes.imgPreview}>
        <img src={localUrl} />
      </div>

      )}
    </div>
    {localUrl && (
      <div className={classes.cropper}>
        {/* CROPPER HERE  */}
        <Cropper
      src={localUrl}
      style={{ height: 400, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={16 / 9}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
    />
      </div>
    )}
    {/* END IMAGE PICK  */}


      <div className={classes.form}>
        <TextField color='secondary' InputLabelProps={{
      style: { color: '#800A01' }}} id="outlined-basic" label="Name" variant="outlined" />
        <TextField color='secondary' InputLabelProps={{
      style: { color: '#800A01' }}} id="outlined-basic" label="Age" variant="outlined" />
        <TextField color='secondary' InputLabelProps={{
      style: { color: '#800A01' }}} id="outlined-basic" label="City" variant="outlined" />
      </div>
    </div>
    </>

  )
}
