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
  <div className={classes.main} >
    <div className={classes.paddingTop}></div>
      <div className={classes.header}>
      <div className={classes.headerBox}>
        <div className={classes.imgBox}>
          <img src='/redGold.png' />
        </div>
        <div className={classes.title}>
          <h1>Building a <span style={{fontWeight: 700}}>Strong</span> Tribe of Men in Washington State</h1>
        </div>
      </div>
      </div>


      <div className={classes.section1}>
        <h1 className={classes.sectionH1}>How you will change</h1>
        <p className={classes.p1}>You will be surrounded by men who want to be the best versions of themselves. In this environment, you will learn: </p>
        <div className={classes.threeCols}>
          <div>
          <div className={classes.sectionH2}>
              <h2>Confidence and Articulation</h2>
            </div>
            <p>You will practice public speaking so you can improve your social skills in both small and large groups of people.</p>
          </div>
          <div>
            <div className={classes.sectionH2b}>
              <h2>Mental Fortitude</h2>
            </div>
            <p>You will master your own mind and become disciplined, so you can attack goals with pure belief in yourself. This begins with building your self-identity.</p>
          </div>
          <div>
          <div className={classes.sectionH2}>
              <h2>Accountability</h2>
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
        <p>We value support, accountability, and giving your best effort. You don't have to worry about fitting in. If you like to be around highly ambitious people, and you try your best to improve yourself, <span style={{fontWeight: '400'}}>you are welcome here.</span></p>
      </div>

      {/* SECTION 3 -- VALUES */}

      <div className={classes.section3}>
        <h1>What you'll Do</h1>
        <p>Represent your achievements.</p>
        <p>
        Don't know where to begin? We have a set of challenges that you can conquer.
        <br/></p>
        <div className={classes.opCols}>
          <div>
            <h3>1</h3>
            <p>
            Complete a Challenge. Earn a Badge that is pinned on your profile.
            </p>
          </div>
          <div>
            <h3>2</h3>
            <p>
            Earn more badges, build your character, and celebrate your achievements with the group.
            </p>
          </div>
          <div className={classes.lastDiv} >
            <h3>3</h3>
            <p>
            Test your comfort zone both physically and mentally. Badges can also be earned by giving presentations or making contributions to the group.
            </p>
            <a style={{fontSize: '1.3rem'}} href='/badges'>(View all Badges)</a>
          </div>
        </div>
        <p>Time to start Winning. Bring back victories and help build a strong reputation for the tribe and for yourself.</p>
      </div>
      <div className={classes.lastParaBox}>
        <p className={classes.lastPara} >Are you ready to improve your life and surround yourself with like-minded men?</p>
      </div>
      <div className={classes.btnJoin}  onClick={() => routePage('/join')}>JOIN THE TRIBE !</div>
      <p className={classes.lastPara2} >We look forward to seeing you there.</p>


  </div>

  )
}
