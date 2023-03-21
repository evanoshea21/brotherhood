import React from 'react'
import classes from '../../styles/Profile.module.css';
import { Context } from '../../globals/context.js';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';


const UserProfile = () => {
  const router = useRouter();
  const {userData} = React.useContext(Context);
  const [thisUser, setThisUser] = React.useState();
  const [sameUser, setSameUser] = React.useState(false);

  React.useEffect(() => {
    if(router.isReady) {
      let pid = Number(router.query.pid);
      if (pid === userData?.id) {
        setThisUser(userData);
        setSameUser(true);
      } else {
        axios({url: `/api/users/id/${pid}`, method: 'GET'})
        .then(response => setThisUser(response.data[0]))
        .catch(err => console.warn(err));
      }
    }
  },[router.query]);

  React.useEffect(() => {
    console.log('userdata', userData);
  },[]);


  return (
    <div className={classes.main}>
      <div className={classes.title}>
        <h1>Member: {thisUser?.fname} {thisUser?.lname}</h1>
        {sameUser && (
          <button onClick={() => router.push('/profile')}  className={classes.yourProfileBtn} >View your Profile</button>
        )}
      </div>

      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.pic}>
            <Avatar alt={userData.name} src={thisUser?.pic}
            sx={{ width: 144, height: 144 }}
            />
          </div>
          <div className={classes.info}>
            <div className={classes.name}>{thisUser?.fname} {thisUser?.lname}</div>
            <div className={classes.ageCity}>23 | {thisUser?.city}</div>
            <div className={classes.speechCount}>Speech: {thisUser?.speech_count}</div>
          </div>
        </div>
        <div className={classes.bodyBox}>
          <div className={classes.bio}>
            <h3>Bio</h3>
              <p className={classes.bioText}>{thisUser?.bio ? thisUser?.bio : 'No bio added yet...'}</p>
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

export default UserProfile