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

const Badges = () => {
  const router = useRouter();
  const { userData, badges, setBadges, badgesEarned, setBadgesEarned } = React.useContext(Context);
  const [allBadges, setAllBadges] = React.useState(badges)
  const [earnedIds, setEarnedIds] = React.useState([])
  const [windowSize, setWindowSize] = React.useState([]);

  React.useEffect(() => { //window resize
    if(window) {
      const handleWindowResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
      };
      handleWindowResize();
      window.addEventListener('resize', handleWindowResize);

      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, []);


  React.useEffect(() => {//set badges if not global
    if(!badges.length) {
      axios({url: `/api/badges`, method: 'GET'})
      .then(res => {
        setAllBadges(res.data);
        setBadges(res.data);
      })
      .catch(err => console.error(err));
    }
  },[]);

  React.useEffect(() => {
    console.log('all badges', allBadges);

    if(!badgesEarned) {
      axios({url: `/badges/fromuser/${userData.id}`, method: 'GET'})
      .then(res => {
        let ids = res.data.map(earned => earned.badge_id)
        setEarnedIds(ids);
      })
      .catch(err => console.error(err));
    } else {
      let filtered = badgesEarned.filter(badge => {
        return badge.user_id === userData.id;
      })
      let ids = filtered.map(earned => earned.badge_id)
      setEarnedIds(ids);
    }
  },[allBadges]);

  const addToWishList = (badgeId) => {
    console.log('adding to wishlist badge and user:', badgeId, userData.id);

    //create add wishlist route
  };



  return (
    <div className={classes.main}>
      <h1>Badges</h1>
      <Button onClick={() => router.push('/addbadge')}  sx={{ml: '30px', p: '10px 20px'}} variant="contained">Add Badge</Button>
      {/* <h2>Width: {windowSize[0]}</h2> */}
      <div className={classes.list}>
        {allBadges && (
          <>
          {allBadges.map(badgeData => (
            <div id={badgeData.id} className={classes.badgeCard}>
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
                    <PlaylistAddCheckIcon />
                    <p className={classes.text}  >Accomplished</p>
                  </div>
                ) : (

                  <div onClick={() => addToWishList(badgeData.id)}  className={classes.add}>
                    <PlaylistAddIcon />
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

export default Badges