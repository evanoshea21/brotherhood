import React from 'react'
import classes from '../styles/BadgesPage.module.css';
import { Context } from '../globals/context.js';
import Badge from '../components/ui/Badge.js';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';


import axios from 'axios';

const Badges = ({allBadges}) => {
  const router = useRouter();
  const { userData } = React.useContext(Context);
  const [badges, setBadges] = React.useState(allBadges);
  const [earnedIds, setEarnedIds] = React.useState([])

  React.useEffect(() => {
    if(['superadmin', 'admin'].includes(userData?.member_type)) {
      //get badges
      axios({url: `/api/badges`, method: 'GET'})
      .then(res => setBadges(res.data))
      .catch(err => {console.error(err)});
    }
  },[]);
  // use effect to get all badges that are currently accomplished by this user
  React.useEffect(() => {

    if(userData?.email) {
      axios({url: `/api/badges/fromuser/${userData.id}`, method: 'GET'})
      .then(res => {
        let ids = res.data.map(earned => earned.badge_id)
        setEarnedIds(ids);
      })
      .catch(err => console.error(err));
    }

  },[allBadges]);

  const addToWishList = (badgeId) => {
    console.log('adding to wishlist badge and user:', badgeId, userData.id);
    //create add wishlist route
  };



  return (
    <div className={classes.main}>
      <h1 className={classes.mainTitle} >Badges</h1>
      {/* Add Badge button for superadmin only (may add admin in future) */}
      <div className={classes.welcomeBox}>
        <p className={classes.welcome} >Welcome to the wall of badges. These badges, once earned, <span style={{fontWeight: '400', color: 'var(--primary-color)'}}>are forever </span>engraved into your profile card.</p>
      </div>
      {['superadmin'].includes(userData?.member_type) && (
        <Button onClick={() => router.push('/addbadge')}  sx={{ml: '30px', p: '10px 20px'}} variant="contained">Add Badge</Button>
      )}

      {/* LIST OF BADGES */}
      <div className={classes.list}>
        {badges && (
          <>
          {badges.map(badgeData => (
            <div key={`badges${badgeData.id}`} id={`badges-${badgeData.id}`} className={classes.badgeCard}>
              {/* <div className={classes.xp}>{badgeData.xp} XP</div> */}
              <div className={classes.content}>
                <div className={classes.badge}>
                  <Badge diameterPx='150px' defaultData={badgeData}/>
                </div>
                <h2 className={classes.title}>
                  {badgeData.name}
                </h2>
                <p className={classes.description}>{badgeData.description}</p>
              </div>
              {userData?.email && (
              <div className={classes.iconBox}>
                {earnedIds.includes(badgeData.id) ? (
                  <div className={classes.check}>
                    <PlaylistAddCheckIcon sx={{fontSize: '2.6rem'}}/>
                    <p className={classes.text}  >Accomplished</p>
                  </div>
                ) : (
                  <div onClick={() => addToWishList(badgeData.id)}  className={classes.add}>
                    <PlaylistAddIcon sx={{fontSize: '2.6rem'}}/>
                    <p className={classes.text}>Add to Wishlist</p>
                  </div>
                )}
              </div>
              )}
            </div>
          ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Badges;

export async function getStaticProps(context) {
  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;
    // do async stuff to get data
    let badgesRes = await axios({url: `${base_url}/badges`, method: 'GET'});

    const allBadges = badgesRes.data;

    return {
      props: {
        allBadges
      },
      revalidate: 300, // 5 minutes
    }

  } //end getStaticProps