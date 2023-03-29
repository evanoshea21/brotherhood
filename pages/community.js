import React from 'react'
import classes from '../styles/Community.module.css'
import { InlineWidget, PopupButton } from "react-calendly";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import MemberCard from '../components/MemberCard.js';
import { Context } from '../globals/context.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';


const Community = ({members, badgesEarned}) => {

  const {userData} = React.useContext(Context);

  // const [realMembers, setRealMembers] = React.useState([]);
  // const [badgesEarnedUpdate, setBadgesEarnedUpdate] = React.useState(badgesEarned);
  console.log('earned\n\n', badgesEarned);


  return (
    <div className={classes.comm} >
      <h1>COMMUNITY</h1>
      <div className={classes.header}>
        <div className={classes.calendly}>
          <div className={classes.scrollArrow}>
            <p>Scroll</p>
            <KeyboardArrowDownIcon
            sx={{width: '50px', height: '50px'}}
            />
          </div>
        <InlineWidget
        url="https://calendly.com/spartanbrotherhood/speech"
        prefill={{
          email: userData?.email,
          firstName: userData?.fname,
          lastName: userData?.lname,
          name: `${userData?.fname} ${userData?.lname}`,
          customAnswers: {
            a1: 'Optional..',
          },
          // date: new Date(Date.now() + 86400000)
        }}
        />
        </div>
        <div className={classes.resources}>
          <h2>Resources</h2>

          <div className={classes.buttons}>
          <div className={classes.discord}>
            <i className="fa-brands fa-discord"></i>
            <p>DISCORD</p>
          </div>
          <div className={classes.facebook}>
          <i className="fa-brands fa-square-facebook"></i>
            <p>FACEBOOK</p>
          {/* <span>FACEBOOK</span> */}
          </div>
          <div className={classes.googleCalIcon}>
          <i className="fa-brands fa-google"></i>
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
            <MemberCard key={memberData.id} memberData={memberData} badgesEarned={badgesEarned}/>
          )
        })}
        </div>
      </div>


    </div>
  )
}

export default Community;

export async function getStaticProps(context) {
  const HOST = process.env.SERVER_HOST || 'localhost';
  const PORT = process.env.SERVER_PORT || '5003';
  const base_url = `http://${HOST}:${PORT}`;
    // do async stuff to get data
    let membersRes = await axios({url: `${base_url}/users`, method: 'GET'});
    let badgesEarnedRes = await axios({url: `${base_url}/badges/earned`, method: 'GET'});

    const members = membersRes.data;
    const badgesEarned = badgesEarnedRes.data;

    // console.log('SSG: members..', members[0], '\n\nEARNED\n\n', badgesEarned[0]);

    // if(!data) {
    //   return {
    //     destination: '/not-found'
    //   }
    // }
    // if(!data.length) {
    // return {notFound: true}; //redirects to 404 page
    // }

    return {
      props: {
        members,
        badgesEarned
      },
      revalidate: 300, // 5 minutes
    }

  } //end getStaticProps