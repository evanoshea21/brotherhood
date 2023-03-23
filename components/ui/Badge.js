import React from 'react'
import classes from '../../styles/Badge.module.css';
import Tooltip from '../ui/BadgeTooltip.js';
import axios from 'axios';
import { Context } from '../../globals/context.js';

const Badge = ({badgeEarned, diameterPx, defaultData}) => {
  const { badges } = React.useContext(Context);
  //DATA -->  `id` `user_id` `badge_id` `date_earned` `victory_story` `verified`
  const [badgeData, setBadgeData] = React.useState(defaultData);

  React.useEffect(() => {
    if(defaultData) {
      setBadgeData(defaultData);
    }
  },[defaultData]);

  React.useEffect(() => {
    if(!badges && badgeEarned) {
      axios({url: `/api/badges/${badgeEarned.badge_id}`, method: 'GET'})
      .then(res =>  setBadgeData(res.data[0]))
      .catch(err => console.error(err));
    } else if (badgeEarned) {
      let badgeInfo;
      for(let i = 0; i < badges.length; i++) {
        if(badges[i].id === badgeEarned.badge_id) {
          badgeInfo = badges[i];
          break;
        }
      }
      setBadgeData(badgeInfo);
    }
  }, []);

  const [fontSizeCalc, setFontSizeCalc] = React.useState('40px');
  const [fontColor, setFontColor] = React.useState('gold');

  React.useEffect(() => { //set font size/color
    if(badgeData) {
      setFontSizeCalc(calcFontSize());
      //set font color
      let start = badgeData.image_path.indexOf('/', 2) + 1;
      let end = badgeData.image_path.indexOf('.png');
      let badgeColor = badgeData.image_path.slice(start, end);
      // console.log('badge color: ', badgeColor);
      if(['gold','high-gold','green'].includes(badgeColor)) {
        setFontColor('white');
      }
    }
    },[badgeData]);


  function calcFontSize() {
    let str = String(Number(diameterPx.slice(0,-2))/2.4);
    let strPx = str + 'px';
    return strPx;
    console.log('pixels str', strPx, typeof strPx);
  }


  return badgeData && (
    <>
    {!badgeData && (
      <p>..</p>
      )}
    {defaultData ? (
      <span className={classes.badge}>
      <div style={{width: diameterPx, height: diameterPx}} className={classes.badgeBox}>

<div style={{color: fontColor, fontSize: `${fontSizeCalc}`}} className={classes.badgeTitle}>{badgeData.id}</div>

<img className={classes.img}  src={badgeData.image_path} />

</div>
    </span>
    ) : (
      <span className={classes.badge}>

        <Tooltip title={badgeData.name} rundown={badgeData.rundown} date_earned={badgeEarned.date_earned} story={badgeEarned.victory_story} verified={badgeEarned.verified} badge_id={badgeData.id}
        >
        <div style={{width: diameterPx, height: diameterPx}} className={classes.badgeBox}>

<div style={{color: fontColor, fontSize: `${fontSizeCalc}`}} className={classes.badgeTitle}>{badgeData.id}</div>

<img className={classes.img}  src={badgeData.image_path} />

</div>
      </Tooltip>
      </span>
    )}


      </>

  )
}

export default Badge