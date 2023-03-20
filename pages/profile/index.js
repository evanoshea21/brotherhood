import React, { useRef } from 'react'
import classes from '../../styles/Profile.module.css';
import { Context } from '../../globals/context.js';
import { useRouter } from 'next/router';
import {Avatar, Button, TextField, Typography} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CropModal from '../../components/CropModal.js';


const Profile = () => {
  const router = useRouter();
  const {userData, testContext} = React.useContext(Context);

  const [editMode, setEditMode] = React.useState(false);
  const [fnameErr, setFnameErr] = React.useState(false);
  const [lnameErr, setLnameErr] = React.useState(false);
  const [cityErr, setCityErr] = React.useState(false);

  const [bioText, setBioText] = React.useState('');

  React.useEffect(() => {
    console.log('userdata', userData);
  },[]);

  const fnameRef = useRef();
  const lnameRef = useRef();
  const cityRef = useRef();
  function updateProfile() {
    let fname = fnameRef.current.value;
    let lname = lnameRef.current.value;
    let city = cityRef.current.value;
    let bio = bioText;

    let editObj = {fname, lname, city, bio};
    console.log('edit obj', editObj);

    setEditMode(false);
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
            <Avatar alt={userData.name} src={userData.pic}
            sx={{ width: 144, height: 144 }}
            />
          </div>
          <div className={classes.info}>
          {!editMode ? (
          //display
          <div className={classes.name}>Evan O'Shea</div>
        ) : (
          //edit mode
          <div>
          <TextField
          // color='secondary'
          helperText=''
          InputProps={{onFocus: () => setFnameErr(false)}}
          InputLabelProps={{style: { color: '#800A01' }}}
          label="First Name"
          inputRef={fnameRef}
          variant="outlined" />

          <TextField
          // color='secondary'
          error={lnameErr}
          helperText=''
          InputProps={{onFocus: () => setFnameErr(false)}}
          InputLabelProps={{style: { color: '#800A01' }}}
          label="Last Name"
          inputRef={lnameRef}
          variant="outlined" />
          </div>
        )}
        {!editMode ? (
          //display
          <div className={classes.ageCity}>23 | {userData.city}</div>
        ) : (
          //edit mode
          <>
          23 |
          <TextField
          // color='secondary'
          error={cityErr}
          helperText=''
          InputProps={{onFocus: () => setFnameErr(false)}}
          InputLabelProps={{style: { color: '#800A01' }}}
          label="City"
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
          // <TextField
          // color='secondary'
          // sx={{ width: '90%' }}
          // helperText=''
          // InputProps={{onFocus: () => setFnameErr(false)}}
          // InputLabelProps={{style: { color: '#800A01' }}}
          // label="Bio"
          // inputRef={bioRef}
          // variant="outlined" />
          <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Bio"
          onChange={(e) => setBioText(e.target.value)}
          style={{ width: 200 }}
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