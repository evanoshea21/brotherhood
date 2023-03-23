import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Context } from '../globals/context.js';
import classes from '../styles/AddBadgeEarned.module.css';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })
import {Avatar, Switch, Button, TextField, Typography} from '@mui/material';
import Badge from '../components/ui/Badge.js';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PhotoCamera from '@mui/icons-material/PhotoCamera';




import axios from 'axios';


export default function AddBadgeEarned() {
  const router = useRouter();

  const [userObj, setUserObj] = React.useState({});
  const [badgeId, setBadgeId] = React.useState(1);
  const [render, setRender] = React.useState(true);
  const [storyText, setStoryText] = React.useState('');
  const [verifiedChecked, setVerifiedChecked] = React.useState(true);


  const [badges, setBadges] = React.useState([]);
  // Form ERROR Handling
  const [errorLabel, setErrorLabel] = React.useState('');



  React.useEffect(() => {
    if(router.isReady) {
      let {userid, fname, lname, pic} = router.query;
      let queryUserObj = {id: userid, fname, lname, pic};
      setUserObj(queryUserObj);
    }
  },[router.query]);

  React.useEffect(() => {
    axios({url: `/api/badges`, method: 'GET'})
    .then(res => setBadges(res.data))
    .catch(err => console.log(err))

  },[]);

  function submitForm() {

    // FORM ERROR HANDLING
    let oneError = {};
    //check badge chosen
    //check userid
    if(!badgeId) { setNameErr(true); oneError.name = true;}
    if(!userObj.id) { setNameErr(true); oneError.name = true;}

    if(Object.keys(oneError).length) {console.log('input error', oneError); setErrorLabel('a field is empty'); return}
    console.log('got passed form error check...');
    setErrorLabel('');

    // POST BADGE

    let postObj = {
      type: 'earned',
      user_id: userObj.id,
      badge_id: badgeId,
      date_earned: formatDate(),
      victory_story: storyText,
      verified: verifiedChecked ? 1 : 0
    };
    console.log('post obj earned: ', postObj);
    // return;

    axios({url: '/api/badges', method: 'POST', data: postObj})
    .then(res => console.log('Posted Badge Earned?\n', res.data))
    .catch(err => console.error(err))

  }

  function formatDate() {
    let newDate = new Date();
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

  const switchVerified = (event) => {
    setVerifiedChecked(event.target.checked);
  };

  return (
    <>
    <div className={classes.main}>

      <h1 className={classes.h1} >Add Badge Earned for {userObj.fname}</h1>
      <div className={classes.avatar}>
        <Avatar alt="Pic" src={userObj?.pic}
          sx={{ width: 84, height: 84 }}
        />
      </div>

    <div className={classes.formContainer}>

    <form className={classes.badgeForm}  onSubmit={e => {e.preventDefault(); submitForm()}}>

      <h2>Victory Story</h2>
      <textarea
        className={classes.textArea}
        maxLength="400"
        onChange={(e) => {
          setStoryText(e.target.value);
        }}
        />

        <h2>Select Badge</h2>

      <div className={classes.badgeSelect}>

        {badges.length && (
        <Select
          sx={{ width: '100%' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={badgeId}
          label="Badge"
            MenuProps={{
              style: {
                maxHeight: 400,
                maxWidth: 300,
                // color: 'blue'
                    },
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root.Mui-selected:hover": {
                    backgroundColor: "var(--bright-color)"
                  },
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "var(--bright-color)"
                  },
                }
              }
            }}
          onChange={(e) => {setBadgeId(e.target.value)}}
          >
          {badges.map(badge => (

            <MenuItem key={badge.id} value={badge.id}>
              <div className={classes.badgePick}>
                <div className={classes.name}>
                <Badge diameterPx='80px' defaultData={badge}/>
                  {badge.name}
                </div>
                <p className={classes.rundown}>
                  {badge.rundown}
                </p>
              </div>
            </MenuItem>
          ))}
        </Select>
        )}
      </div>
      <h2>Verified?</h2>
      <Switch
      checked={verifiedChecked}
      onChange={switchVerified}
      inputProps={{ 'aria-label': 'controlled' }}
    />
      <p>{errorLabel}</p>
      <button className={classes.submitBtn}  type='submit'>Submit</button>

    </form>
    </div>

    </div>
    </>

  )
}
