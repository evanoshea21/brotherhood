import React from 'react'
import classes from '../styles/MemberCard.module.css';
import Avatar from '@mui/material/Avatar';

const MemberCard = ({memberData}) => {
  const [parsedBadges, setParsedBadges] = React.useState();

  React.useEffect(() => {
    if(memberData) {
      setParsedBadges(JSON.parse(memberData.badges));
    }
  }, [])
  return (
    <div className={classes.card}>
      <div className={classes.div}>

        <div className={classes.pic}>
          <Avatar alt="Remy Sharp" src={memberData.pic}
          sx={{ width: 74, height: 74 }}
          />
          {/* <img src={memberData.pic}></img> */}
        </div>
        <div className={classes.userInfo}>
          <h3>{memberData.name}</h3>
          <p>{memberData.age} | {memberData.city}</p>
          <p className={classes.bio} >{memberData.bio}</p>
          <h3>Earned Badges</h3>
          {parsedBadges && (
            parsedBadges.map((badgeName, i) => {
              return (
                <span key={`${badgeName}${i}`} className={classes.badgeIcons} >
                  <i class={`fa-brands ${badgeName}`}></i>
                </span>
              )
            })
          )}

        </div>
      </div>
    </div>
  )
}

export default MemberCard