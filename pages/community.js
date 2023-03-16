import React from 'react'
import classes from '../styles/Community.module.css'
import { PopupButton } from "react-calendly";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import MemberCard from '../components/MemberCard.js';


const Community = () => {
  const [members, setMembers] = React.useState([
    {
    name: 'Evan',
    pic: 'https://barbend.com/wp-content/uploads/2016/11/06_01_mariusz_pudzianowski_064.jpg',
    age: 23,
    city: 'Everett',
    bio: 'My name is Evan, I love to conquer the world. Come work out with me.',
    badges: '["fa-discord", "fa-square-facebook", "fa-google"]'
  },
    {
    name: 'Joe',
    pic: 'https://barbend.com/wp-content/uploads/2016/11/06_01_mariusz_pudzianowski_064.jpg',
    age: 23,
    city: 'Everett',
    bio: 'My name is Evan, I love to conquer the world. Come work out with me.',
    badges: '["fa-discord", "fa-square-facebook", "fa-google"]'
  },
    {
    name: 'Bob',
    pic: 'https://barbend.com/wp-content/uploads/2016/11/06_01_mariusz_pudzianowski_064.jpg',
    age: 23,
    city: 'Everett',
    bio: 'My name is Evan, I love to conquer the world. Come work out with me.',
    badges: '["fa-discord", "fa-square-facebook", "fa-google"]'
  }
]);

  return (
    <div className={classes.comm} >
      <h1>COMMUNITY</h1>
      <div className={classes.header}>
        <div className={classes.googleCal}>

        </div>
        <div className={classes.resources}>
          <h2>Resources</h2>

          <div className={classes.buttons}>
          <div className={classes.discord}>
            <i className="fa-brands fa-discord"></i>
            <p>DISCORD</p>
          </div>
          <div className={classes.facebook}>
          <i class="fa-brands fa-square-facebook"></i>
            <p>FACEBOOK</p>
          {/* <span>FACEBOOK</span> */}
          </div>
          <div className={classes.googleCalIcon}>
          <i class="fa-brands fa-google"></i>
            <p>CALENDAR</p>
          </div>
          </div>
          {/* <PopupButton
          url="https://calendly.com/spartanbrotherhood/speech"
          styles={{
            padding: '20px',
            height: '60px',
            borderRadius: '20px',
            backgroundColor: 'var(--bright-color)',
            borderColor: 'var(--bright-color)',
            fontSize: '1rem',
            color: 'var(--bg-color)',
            fontFamily: 'Sono'
          }}
          rootElement={document.getElementById("root")}
          text="Schedule Public Speaking"
          textColor=""
          color="var(--primary-color)"
          /> */}

        </div>
      </div>

      {/* MEMBERS  */}
      <div>
        <h1>Members</h1>
        <div className={classes.members}>
        {members.map(memberData => {
          return (
            <MemberCard memberData={memberData}/>
          )
        })}
        </div>
      </div>


    </div>
  )
}

export default Community