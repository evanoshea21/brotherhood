import React from 'react'
import classes from '../styles/Badge.module.css';
import Badge from '../components/ui/Badge.js';
import axios from 'axios';
import { Context } from '../globals/context.js';

  const TestPage = () => {
  const { badgesEarned } = React.useContext(Context);
  const [badgeEarned, setBadgeEarned] = React.useState();
  const [badgeDiameter, setBadgeDiameter] = React.useState('40px');

  React.useEffect(() => {
    getUsersBadges();
  },[]);


  function getAllBadges() {
    axios({url: '/api/badges', method: 'GET'})
    .then(res => console.log('All badges\n', res.data))
    .catch(err => console.error(err))
  }
  function getAllBadgesEarned() {
    axios({url: '/api/badges/fromuser', method: 'GET'})
    .then(res => console.log('All badges earned\n', res.data))
    .catch(err => console.error(err))
  }
  function getBadgeById(id) {
    axios({url: `/api/badges/${id}`, method: 'GET'})
    .then(res => console.log(`Badge from id:${id}\n`, res.data))
    .catch(err => console.error(err))
  }
  function getUsersBadges() {
    axios({url: '/api/badges/fromuser/1', method: 'GET'})
    .then(res => setBadgeEarned(res.data[0]))
    .catch(err => console.error(err))
  }

  function addBadgeEarned() {
    let postObj = {
      type: 'earned',
      user_id: 1,
      badge_id: 1,
      date_earned: '2022-01-01',
      victory_story: 'Victory story of this badge earned goes here',
      verified: 1
    };

    axios({url: '/api/badges', method: 'POST', data: postObj})
    .then(res => console.log('Posted Badge Earned?\n', res.data))
    .catch(err => console.error(err))
  }
  function addBadge() {
    let postObj = {
      type: 'badge',
      name: '600 pushups',
      requirements: '1. do 600 pushups2. Then post it online',
      rundown: 'Do 600 pushups',
      description: 'Do 600 pushups all day every day baby more description goes here all day....yup yup.',
      image_path: '/badges/black.png',
    };

    axios({url: '/api/badges', method: 'POST', data: postObj})
    .then(res => console.log('Posted Badge?\n', res.data))
    .catch(err => console.error(err))
  }

  function printEarned() {
    console.log('Earned\n', badgesEarned);
  }









  return (
    <>
    <div className={classes.main}>
      {badgeEarned && (
        <>
          <Badge diameter={badgeDiameter} badgeEarned={badgeEarned}/>
          <Badge diameter={badgeDiameter} badgeEarned={badgeEarned}/>
          <Badge diameter={badgeDiameter} badgeEarned={badgeEarned}/>
        </>
      )}
    </div>

    <button onClick={() => printEarned()}>Print Earned Badges.. context</button>
    </>
  )
};

export default TestPage;
