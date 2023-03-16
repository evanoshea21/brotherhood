import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '../globals/Layout.js';
import axios from 'axios';
import { Context } from '../globals/context.js';
import classes from '../styles/Home.module.css';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })

// const pageCenter = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '120vh'
// };

export default function Home() {
  const { testContext } = React.useContext(Context);
  const router = useRouter();

  const routePage = (path) => {
    router.push(path);
  }

  return (
    <>
    <div className={classes.paddingTop}></div>
      <div className={classes.header}>
      <div className={classes.headerBox}>
        <div className={classes.imgBox}>
          <img src='/redGold.png' />
        </div>
        <div className={classes.title}>
          <h1>Building the <span style={{fontWeight: 700}}>Strongest</span> Tribe of Men in Washington State</h1>
        </div>
      </div>
      </div>


      <div className={classes.section1}>
        <h1 className={classes.sectionH1}>How you will change</h1>
        <p className={classes.p1}>This tribe is focused on putting in the work to become more capable and formidable men.</p>
        <div className={classes.threeCols}>
          <div>
          <div className={classes.sectionH2}>
              <h2>Improve Confidence and Articulation</h2>
            </div>
            <p>You will practice public speaking while developing your belief system and personal philosophy so you walk the earth with conviction.</p>
          </div>
          <div>
            <div className={classes.sectionH2b}>
              <h2>Develop Strength of Character in the Mind</h2>
            </div>
            <p>You will master your own mind so you can attack challenges with utter belief in yourself. This begins with your self-identity.</p>
          </div>
          <div>
          <div className={classes.sectionH2}>
              <h2>Measured Accountability</h2>
            </div>
            <p>You will be surrounded by Winners who will lift you up and keep you accountable. This brotherhood is what makes us strong.</p>
          </div>

        </div>
      </div>

      {/* SECTION 2 -- VALUES */}

      <div className={classes.section2}>
        <h1>
          What we Value
        </h1>
        <p>There is only one question you should ask while you're here: <br/><span>Do I bring my fellow man up, or down?</span></p>
        <p>This question serves as the foundation of our community: support and accountability.</p>
        <p>We value individual effort and dedication to improve oneself, because if you win, we all win.</p>
      </div>

      {/* SECTION 3 -- VALUES */}

      <div className={classes.section3}>
        <h1>How we Operate</h1>
        <p>Time to level up and represent your progress.<br/><br/>Just as you would earn your stripes in the army or achievements in a video-game.</p>
        <div className={classes.opCols}>
          <p>
          (1) Your profile page will represent all your achievements: badges, contributions, records, victories
          </p>
          <p>
          (2) Earn more badges, earn more respect, & unlock membership privileges, gifts, & we shall celebrate
          </p>
          <p>
          (3) Badges are earned by completing defined challenges, stepping out of your comfort zone, and by contributing to the cause. (See all)
          </p>
        </div>
        <p>Bring back victories for the group to celebrate. Time to start Winning. Earn your badges and help prove to the world that this tribe only consists of winners.</p>
        <div onClick={() => routePage('/join')}>JOIN THE BROTHERHOOD</div>
      </div>






    </>

  )
}
