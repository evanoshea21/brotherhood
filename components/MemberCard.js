import React from 'react'
import classes from '../styles/MemberCard.module.css';
import classes2 from '../styles/ribbon.module.css';
import Avatar from '@mui/material/Avatar';
import { getAge } from '../globals/utils.js';
import { useRouter } from 'next/router';
import { Context } from '../globals/context.js';
import Badge from '../components/ui/Badge.js';
import { dateParsed, daysSince } from '../globals/utils.js';

const MemberCard = ({memberData, badgesEarned}) => {
  const [userEarnedBadges, setUserEarnedBadges] = React.useState([])
  const [justJoined, setJustJoined] = React.useState(false);
  const [age, setAge] = React.useState();
  const [test, setTest] = React.useState(false);
  const [joinString, setJoinString] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    if(memberData) {
      let theirAge = getAge(memberData.date_of_birth);
      setAge(theirAge);
      let joinD = dateParsed(memberData.join_date);
      //joinD = {date, month, monthStr, year}
      setJoinString(`${joinD.monthStr} ${joinD.year}`);

      let daysSinceJoining = daysSince(memberData.join_date);

      if(daysSinceJoining < 10) {
        setJustJoined(true);
      }
    }
  }, [])

  React.useEffect(() => {
    if(badgesEarned) {
      let filteredArr = badgesEarned.filter(badge => {
        return badge.user_id === memberData.id;
      });
      // console.log('badges for ', memberData.fname, '\n', filteredArr);
      setUserEarnedBadges(filteredArr);
    }
  },[badgesEarned]);

  return (
    <div className={classes.card}>
        {justJoined ? (
          <div className={`${classes2.ribbon} ${classes2.ribbonTopRight}`}><span>Just Joined !</span></div>
          ) : (
          <div className={classes.xp}>{memberData.xp} XP</div>
        )}
      {/* <div className={classes.div}> */}

        <div onClick={() => router.push(`profile/${memberData.id}`)}  className={classes.pic}>
          <Avatar alt="Remy Sharp" src={memberData.pic}
          sx={{ width: 84, height: 84 }}
          />
          <div className={classes.joinDate}>Member Since <br/>{joinString}</div>
          {/* <img src={memberData.pic}></img> */}
        </div>

        <div className={classes.userInfo}>
          <h3 className={classes.name} onClick={() => router.push(`profile/${memberData.id}`)}>{memberData.fname} {memberData.lname}</h3>

          <p>{age} | {memberData.city}</p>

          <p className={classes.bio} >{memberData.bio}</p>

          <h3>Earned Badges</h3>

          <div className={classes.badgeList}>
          {userEarnedBadges.length && (
            userEarnedBadges.map((earned, i) => {
              return (
                  <Badge key={earned.id} badgeEarned={earned} diameterPx='38px'/>
                  )
                })
                )}
          </div>

        </div>
      {/* </div> */}
    </div>
  )
}

export default MemberCard