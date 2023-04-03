import React from 'react'
import classes from '../../styles/Profile.module.css';
import { Context } from '../../globals/context.js';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Badge from '../../components/ui/Badge.js';
import { getAge, dateParsed, daysSince } from '../../globals/utils.js';


const UserProfile = ({badgesEarned, badges}) => {
  const router = useRouter();
  const {userData} = React.useContext(Context);
  const [thisUser, setThisUser] = React.useState();
  const [sameUser, setSameUser] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [joinString, setJoinString] = React.useState('');
  const [earnedBadges, setEarnedBadges] = React.useState(badgesEarned.reverse());

  React.useEffect(() => {
    console.log('badgesEarned', badgesEarned);
  },[]);

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
    if(thisUser?.email) {
      let theirAge = getAge(thisUser.date_of_birth);
      setAge(theirAge);
      let joinD = dateParsed(thisUser.join_date);
      //joinD = {date, month, monthStr, year}
      setJoinString(`${joinD.date} ${joinD.monthStr} ${joinD.year}`);

      let daysSinceJoining = daysSince(thisUser.join_date);
    }
  },[thisUser]);

  if(!userData?.email) {
    return (
      <h1></h1>
    )
  }


  return (
    <div className={classes.main}>
      <div className={classes.title}>
        <h1>Member Profile</h1>
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
            <div className={classes.xp}>{thisUser?.xp} xp</div>
            <div className={classes.joinDate}>Member Since <br/>{joinString}</div>
          </div>
          <div className={classes.info}>
            <div className={classes.name}>{thisUser?.fname} {thisUser?.lname}</div>
            <div className={classes.ageCity}>{age} <span style={{margin: '4px'}}>|</span> {thisUser?.city}</div>
            {/* <div className={classes.speechCount}>Speech: {thisUser?.speech_count}</div> */}
              <p className={classes.bioText}>{thisUser?.bio ? thisUser?.bio : 'No bio added yet...'}</p>

          </div>
        </div>
        <div className={classes.bodyBox}>
          <div className={classes.badges}>

            <h1>Badges</h1>
            <div className={classes.badgeList}>
              {/* //badgeEarned, badges, diameterPx, defaultData */}
              {earnedBadges.map(earned => (
                <Badge key={`profileEarned${earned.id}`} badgeEarned={earned} badges={badges} diameterPx='60px'/>
              ))}
            </div>

          </div>
          <div className={classes.personalLinks}>
            <h1>Personal Links</h1>
            {thisUser?.notion_link && (
                <a href="http://notion.com">
                  <div className={`${classes.link} ${classes.notion}`}>
                  <i className="fa-regular fa-file-lines"></i>
                  <p>NOTION PAGE</p>
                  </div>
                </a>
              )}
              {thisUser?.discord_handle && (
                <a href="http://discord.com">
                  <div className={`${classes.link} ${classes.discord}`}>
                  <i className="fa-brands fa-discord"></i>
                  <p>DISCORD</p>
                  </div>
                </a>
              )}
            <a href={`mailto: ${thisUser?.email}`}>
              <div className={`${classes.link} ${classes.email}`}>
              <i className="fa-sharp fa-solid fa-envelope"></i>
              <p>EMAIL</p>
              </div>
            </a>

          </div>
        </div>


      </div>
    </div>
  )
}

export default UserProfile;

export async function getServerSideProps(context) {
  const { pid } = context.query;
  //
  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;
    // do async stuff to get data
    let badgesEarnedRes = await axios({url: `${base_url}/badges/fromuser/${pid}`, method: 'GET'});
    let badgesRes = await axios({url: `${base_url}/badges`, method: 'GET'});

    const badgesEarned = badgesEarnedRes.data;
    const badges = badgesRes.data;

    return {
      props: {
        badgesEarned,
        badges
      }
    }

}