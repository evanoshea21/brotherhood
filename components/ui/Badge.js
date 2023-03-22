import React from 'react'
import classes from '../../styles/test.module.css';
import Tooltip from '../ui/BadgeTooltip.js';

const Badge = ({badgeEarned, diameter}) => {
  //DATA -->  `id` `user_id` `badge_id` `date_earned` `victory_story` `verified`
  const [badgeData, setBadgeData] = React.useState({
    id: 1,
    name: '500 pushups',
    requirements: '1. Do the pushups\n2. Film it\n3. Submit form',
    rundown: 'Do 500 pushups in one go',
    description: 'Do 500 pushups in one go. Film a video for proof. And you gotta get this done in a single day. You can do it however you like.',
    image_path: '/badges/redRound.png'
  });

  const [fontSizeCalc, setFontSizeCalc] = React.useState('40px');
  const [fontColor, setFontColor] = React.useState('gold');

  React.useEffect(() => {
    setFontSizeCalc(calcFontSize());

    //set font color
    let start = badgeData.image_path.indexOf('/', 2) + 1;
    let end = badgeData.image_path.indexOf('.png');
    let badgeColor = badgeData.image_path.slice(start, end);
    console.log('badge color: ', badgeColor);
    if(['gold','high-gold','green'].includes(badgeColor)) {
      setFontColor('white');
    }
  },[]);


  function calcFontSize() {
    let str = String(Number(diameter.slice(0,-2))/2.4);
    let strPx = str + 'px';
    return strPx;
    console.log('pixels str', strPx, typeof strPx);
  }

  return (
      <Tooltip title={badgeData.name} rundown={badgeData.rundown} date_earned={badgeEarned.date_earned} story={badgeEarned.victory_story} verified={badgeEarned.verified} badge_id={badgeData.id}>

        <div style={{width: diameter, height: diameter}} className={classes.badgeBox}>

        <div style={{color: fontColor, fontSize: `${fontSizeCalc}`}} className={classes.badgeTitle}>{badgeData.id}9</div>
        <img className={classes.img}  src={badgeData.image_path} />

        </div>
      </Tooltip>
  )
}

export default Badge