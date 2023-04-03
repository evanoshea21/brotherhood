import React from 'react'
import classes from '../styles/Community.module.css'
import { InlineWidget, PopupButton } from "react-calendly";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import MemberCard from '../components/MemberCard.js';
import { Context } from '../globals/context.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import { useRouter } from 'next/router';


const Community = ({members, badges, badgesEarned}) => {
  const router = useRouter();
  const {userData} = React.useContext(Context);
  const [showCalendly, setShowCalendly] = React.useState(false);

  members.reverse();

  return (
    <div className={classes.comm} >
      <div className={classes.calendly1}>
        {/* {showCalendly && (
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
        )} */}
      </div>
      <h1 className={classes.mainTitle} >COMMUNITY</h1>
      <div className={classes.header}>
        <div onClick={() => router.push('/schedule')}  className={classes.calendarBox}>
          <img className={classes.img}  src='/calendly2.png'></img>
        </div>
        <div className={classes.resources}>
          <h2>Resources</h2>

          <div className={classes.buttons}>
          <div className={classes.notion}>
          <i className="fa-sharp fa-solid fa-n"></i>
            <p>Notion Page</p>
          </div>
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
        <h1 className={classes.mainTitle} >Members</h1>
        <div className={classes.members}>
        {members.map(memberData => {
          return (
            <MemberCard key={memberData.id} memberData={memberData} badges={badges} badgesEarned={badgesEarned}/>
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
    let badgesRes = await axios({url: `${base_url}/badges`, method: 'GET'});

    const members = membersRes.data;
    const badgesEarned = badgesEarnedRes.data;
    const badges = badgesRes.data;

    return {
      props: {
        members,
        badgesEarned,
        badges
      },
      revalidate: 30, // 30 seconds
    }

  } //end getStaticProps