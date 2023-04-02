import React from 'react'
import classes from '../styles/MemberCard.module.css';
import classes2 from '../styles/ribbon.module.css';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';
import { Context } from '../globals/context.js';
import Badge from '../components/ui/Badge.js';
import { getAge, dateParsed, daysSince } from '../globals/utils.js';

const MemberCard = ({memberData, badges, badgesEarned}) => {
  const [userEarnedBadges, setUserEarnedBadges] = React.useState();
  const [theseBadges, setTheseBadges] = React.useState();

  const [bio, setBio] = React.useState('');
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
      setJoinString(`${joinD.date} ${joinD.monthStr} ${joinD.year}`);

      let daysSinceJoining = daysSince(memberData.join_date);

      if(daysSinceJoining < 10) {
        setJustJoined(true);
      }

      //BIO
      if(memberData.bio?.length > 130) {
        let bioText = memberData.bio.slice(0,130) + '...';

        setBio(bioText);
      } else {
        setBio(memberData.bio);
      }
    }
  }, [])

  React.useEffect(() => {
    if(badgesEarned) {
      let filteredArr = badgesEarned.filter(badge => {
        return badge.user_id === memberData.id;
      });
      // console.log('badges for ', memberData.fname, '\n', filteredArr);
      setUserEarnedBadges(filteredArr.reverse());
      // console.log('should have set userEarnedBadges.....');
    }
  }, [badgesEarned]);

  // React.useEffect(() => {
  //   console.log('badges, userEarned', badges, '\n..', userEarnedBadges);
  //   if(badges && userEarnedBadges) {
  //     //go through userearned
  //     let badgeIds = {};
  //     userEarnedBadges.forEach(badgeEarned => {
  //       badgeIds[`${badgeEarned.badge_id}`] = true;
  //     });
  //     //find all badges and push into array
  //     let filteredBadges = [];
  //     badges.forEach(badge => {
  //       if(badgeIds[`${badge.id}`]) {
  //         filteredBadges.push(badge);
  //       }
  //     });
  //     console.log('filtered badges: ', filteredBadges);
  //     setTheseBadges(filteredBadges);

  //   }
  // }, [badges, userEarnedBadges]);

  return (
    <div className={classes.card}>
        {justJoined ? (
          <div className={`${classes2.ribbon} ${classes2.ribbonTopRight}`}><span>Just Joined !</span></div>
          ) : (
            <>
            </>
          // <div className={classes.xp}>{memberData.xp} XP</div>
        )}
      {/* <div className={classes.div}> */}

        <div onClick={() => router.push(`/profile/${memberData.id}`)}  className={classes.pic}>
          <Avatar alt="Remy Sharp" src={memberData.pic}
          sx={{ width: 84, height: 84 }}
          />
          <div className={classes.joinDate}>Member Since <br/>{joinString}</div>
          {/* <img src={memberData.pic}></img> */}
        </div>

        <div className={classes.userInfo}>
          <h3 className={classes.name} onClick={() => router.push(`profile/${memberData.id}`)}>{memberData.fname} {memberData.lname}</h3>

          <p className={classes.ageCity} >{age} | {memberData.city}</p>

          <p className={classes.bio} >{bio}</p>

          {(userEarnedBadges?.length !== 0) && (
            <h3 className={classes.badgeListTitle} >Badges Earned</h3>
          )}

          <div className={classes.badgeList}>
          {userEarnedBadges && (
            userEarnedBadges.map((earned, i) => {
              return (
                  <Badge key={earned.id} badges={badges} badgeEarned={earned} diameterPx='38px'/>
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