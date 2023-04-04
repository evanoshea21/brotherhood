import React from 'react'
import classes from '../styles/Mission.module.css';
import {Avatar} from '@mui/material';

const Mission = () => {
  return (
  <div className={classes.main} >
    <h1 className={classes.title} >Mission</h1>
    <div className={classes.bodyBox}>

    <p className={classes.hero} >
      To become more confident, you must be able to <span>articulate</span> what you stand for. Developing a voice <span>empowers</span> you and can help you change the world around you.
    {/* FOR MENS GROUP
    Strength reduces suffering. But to become strong you must voluntarily endure <span>discomfort</span> to callous your mind and body. */}
    </p>

    <h2 className={classes.header} >3 Mission Objectives</h2>
    <div className={classes.objectives}>
      <div className={classes.col1}>
        <h3 className={classes.smallHeader} >Articulation</h3>
        <p>If you can't articulate what you believe in, you can't defend your position with conviction and honor. Moreover, you have no personal philosophy that serves as the backbone of all your decisions and actions. That's why we dedicate a portion of our meetings to the skill of public expression.
        <br/><br/>
        Public expression involves creating slides, blogs, or other formats where you present your thoughts to the group. Being correct is not the primary goal. Making a logical case and strengthening your muscle of articulation is.
        <br/><br/>

        Confidence in expression will ultimately aid you in creating meaningful connections, standing up for what you believe in, getting a promotion or raise at work, meeting and courting your future partner, and more.</p>
      </div>
      <div className={classes.col2}>
        <h3 className={classes.smallHeader} >Mentality Training</h3>
        <p>The only thing that man can control is the contents of his own mind. Here you will develop a powerful self-identity and practice positive self-talk as it massively impacts your success in all areas of your life. Without mental stoicism and discipline, man lays at the mercy of his environment.
        <br/><br/>

        Guiding philosophies include Stoic teachings, psychological literature, methods used by cultural icons and high performers, and from wisdom shared amongst the group.
        <br/><br/>

        The skill of mastering your mind will aid you in becoming more disciplined, controlling your emotions, raising your stress tolerance, and ultimately becoming more successful as your mental endurance and self-belief will power you through adversity.</p>
      </div>
      <div className={classes.col3}>
        <h3 className={classes.smallHeader}>Accountability</h3>
        <p>You are the average of the 5 men you surround yourself with. It's time to start surrounding yourself with Winners.
        <br/><br/>

        Excuses aren't tolerated here, and the goals you set yourself will become the mission by which you're committing to, and you'll never walk alone.
        <br/><br/>

        Accountability is a superpower among men; you will inevitably start conquering when your fellow man believes in you and is expecting your victory.
        <br/><br/>

        Having a support network that believes in you and your success creates a FORCE for you to achieve. And when times get hard, you have men picking you back up. Men are stronger when they work together, and you will feel that brotherhood here.</p>
      </div>
    </div>

    <h3 className={classes.header}>Expectations of the Brotherhood</h3>
    <p className={classes.para} >The most powerful thing about this organization is the sense of comraderie. When you look to your left and right and see highly ambitious men, your mindset will become warrior-like.
    <br/><br/>

    Above all, this group values the support of one another.
    To ensure this, a zero-tolerance rule is in place for anything that jeopordizes one's confidence and takes power away from them. This includes shaming or belittling in any form. We are here to help each other grow, and we are here to celebrate each others victories.
    <br/><br/>

    If one of us is victorious, we ALL Succeed.

</p>

    <h3 className={classes.header}>The Plan</h3>
    <p className={classes.para} >
    <span>Phase 0: Founding Fathers</span>
    <br/><br/>

    Recruit an initial group of men to cultivate the spirit of the group-to-be. All meetings will start online (discord) until phase 1 is achieved.
    <br/><br/>

    <span>Objectives:</span>
    <br/><br/>
    Develop a solid week-to-week schedule where consistent growth is achieved by all members
    <br/><br/>
    Develop the rules that will govern the the organization (developed by founding/initial members). This includes setting roles and responsibilities and creating a schedule that benefits all members.
    <br/><br/>
    <br/><br/>

    <span>Phase 1: Become Official (in-person meetings)</span>
    <br/><br/>

    Becoming financially self-sufficient as an organization, with the PRIME goal of attaining physical space to host our meetings in-person.
    <br/><br/>
    <br/><br/>

    <span>Phase 2: Tentative....</span>
    </p>


    <h3 className={classes.header}>How we Began</h3>
    <div className={classes.aboutme}>
      <div className={classes.pic}>
        <Avatar alt="Evan O'Shea" src='/evan.jpeg'
        sx={{width: 204, height: 204 }}
        />
      </div>
    <p className={classes.para} >
    This group was founded by Evan O'Shea based
    out of Everett, WA. He was tired of seeing an epidemic of young men with no purpose and little confidence in what they believe in.
    <br/> <br/>
    He whole-heartedly believes that men are stronger when they get together and hold each other accountable. Being unified by a single purpose builds a forward momentum that isn't deterred as easily by the everyday obstacles of life.
    <br/><br/>
    </p>
    </div>

    {/* <br/><br/> */}

    </div>
  </div>
  )
}

export default Mission