import React, { useRef } from 'react'
import classes from '../../styles/Profile.module.css';
import classes2 from '../../styles/Join.module.css';
import { Context } from '../../globals/context.js';
import { useRouter } from 'next/router';
import {Avatar, Button, TextField, Typography} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CropModal from '../../components/CropModal.js';
import { useS3Upload } from "next-s3-upload";

import axios from 'axios';


const Profile = () => {
  const router = useRouter();
  const {userData, setUserData} = React.useContext(Context);
  const [age, setAge] = React.useState('');

  const [bioText, setBioText] = React.useState('');
  const [editMode, setEditMode] = React.useState(false);
  const [inputErr, setInputErr] = React.useState(false);

    //INITIAL file (s3 / image)
    const [localUrl, setLocalUrl] = React.useState(userData?.pic);
    const [previewUrl, setPreviewUrl] = React.useState();
    const [fileName, setFileName] = React.useState();
    //updated CROP FILE...
    const [file, setFile] = React.useState();
    // this is s3 url returned
    const [s3Url, setS3Url] = React.useState();
    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

    let setInitialFile = async file => {
      // console.log('OG FILE HERE: ', file);
      setFile(file);
      setFileName(file.name);
      setLocalUrl(URL.createObjectURL(file));
      setPreviewUrl(URL.createObjectURL(file));
    };


  React.useEffect(() => {
    console.log('userdata', userData);
    if(userData?.email) {
      let userAge = getAge(userData?.date_of_birth);
      setAge(userAge);
    }
  },[userData]);


  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

let uploadFileToS3 = async () => {
  if(file) {
    try {
      let { url } = await uploadToS3(file);
      return url;
      setS3Url(url);
    } catch (err) {
      return err;
    }
  }
};

  const fnameRef = useRef();
  const lnameRef = useRef();
  const cityRef = useRef();

  function updateProfile() {
    let fname = fnameRef.current.value;
    let lname = lnameRef.current.value;
    let city = cityRef.current.value;
    let bio = bioText;

    if(!fname.length || !lname.length || !city.length) {
      setInputErr(true);
      return;
    }

    let editObj = {id: userData?.id, fname, lname, city, bio};

    //upload to s3
    if(file) {
      uploadFileToS3()
    .then(picUrl => {
      Object.assign(editObj, {pic: picUrl})
      sendUpdate(editObj);
      setEditMode(false);
    })
    .catch(err => console.warn(err));
    return;

  } else {
    sendUpdate(editObj);
    setEditMode(false);
    }

  }

  function sendUpdate(obj) {
    axios({url: '/api/users', method: 'PUT', data: obj})
    .then(res => {
      console.log('user updated?', res.data);

      axios({url: `/api/users/${userData?.email}`, method: 'GET'})
      .then(res => setUserData(res.data[0]))
    })
    .catch(err => console.warn(err));
  }


  return (
    <div className={classes.main}>
      <div className={classes.title}>
        <h1>Hello {userData?.fname}!</h1>
        {editMode ? (
          <button onClick={updateProfile} className={classes.yourProfileBtn} >Update Profile</button>
        ) : (
          <button onClick={() => setEditMode(true)}  className={classes.yourProfileBtn} >Edit your Profile</button>
        )}
      </div>
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.pic}>
            {!editMode ? (
              <Avatar alt={userData.name} src={userData.pic}
              sx={{ width: 144, height: 144 }}
              />
            ) : (
              // {/* IMAGE PICK AND CROP  */}
                <div className={`${classes2.imagePick} ${previewUrl ? classes2.growAnim : ''}`} >
                <FileInput onChange={setInitialFile} />

                <Button sx={{my: '15px', py: '10px', width: '180px', display: 'flex', justifyContent: 'space-between'}} onClick={openFileDialog} variant="contained" component="label"> Change Picture
                <PhotoCamera />
                </Button>

              {/* RESIZE / CROP IMAGE MODAL  */}
              <div className={`${classes2.imgPreview} ${previewUrl ? classes2.fadeInAnim : ''}`}>
                <Avatar alt="Remy Sharp" src={previewUrl || userData?.pic}
                sx={{ width: 154, height: 154 }}
                />
                {localUrl && (
                <div className={`${classes2.cropBtn} ${previewUrl ? classes2.fadeInAnim : ''}`}>
                  <CropModal setPreviewUrl={setPreviewUrl} fileName={fileName} localUrl={localUrl} setFile={setFile} />
                </div>
                )}
              </div>
            </div>
  // {/* END IMAGE PICK  */}
            )}
          </div>
          <div className={classes.info}>
          {!editMode ? (
          //display
          <div className={classes.name}>{userData?.fname} {userData?.lname}</div>
        ) : (
          //edit mode
          <div>
            {inputErr && (
              <h3>First Name, Last Name, City must be filled</h3>
            )}
          <TextField
          // color='secondary'
          helperText=''
          // InputProps={{onFocus: () => setFnameErr(false)}}
          InputLabelProps={{style: { color: '#800A01' }}}
          label="First Name"
          defaultValue={userData?.fname}
          inputRef={fnameRef}
          variant="outlined" />

          <TextField
          // color='secondary'
          // error={lnameErr}
          helperText=''
          // InputProps={{onFocus: () => setFnameErr(false)}}
          InputLabelProps={{style: { color: '#800A01' }}}
          label="Last Name"
          defaultValue={userData?.lname}
          inputRef={lnameRef}
          variant="outlined" />
          </div>
        )}
        {!editMode ? (
          //display
          <div className={classes.ageCity}>{age} | {userData.city}</div>
        ) : (
          //edit mode
          <>
          23 |
          <TextField
          // color='secondary'
          // error={cityErr}
          helperText=''
          // InputProps={{onFocus: () => setFnameErr(false)}}
          InputLabelProps={{style: { color: '#800A01' }}}
          label="City"
          defaultValue={userData?.city}
          inputRef={cityRef}
          variant="outlined" />
          </>
        )}
            <div className={classes.speechCount}>Speech: {userData.speech_count}</div>
          </div>
        </div>
        <div className={classes.bodyBox}>
          <div className={classes.bio}>
            <h3>Bio</h3>
            {!editMode ? (
          //display
          <p>{userData.bio ? userData.bio : 'No bio added yet...'}</p>
          ) : (
            //edit mode
            <textarea
            className={classes.textArea}
            // rows={10}
            // cols={40}
            defaultValue={userData?.bio || (bioText || '' )}
            onChange={(e) => setBioText(e.target.value)}
            />
        )}
          </div>
          <div className={classes.badges}>
            <h3>Badges</h3>
            <div className={classes.badgeBox}>

            </div>
          </div>
          <div className={classes.links}>
            <h3>Links</h3>
            <div className={classes.linkBox}>
              Discord
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;