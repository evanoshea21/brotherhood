import React from 'react'
import classes from '../styles/test.module.css';
import Badge from '../components/ui/Badge.js';
import axios from 'axios';

  const TestPage = () => {
  const [badgeEarned, setBadgeEarned] = React.useState({
    id: 1,
    user_id: 1,
    badge_id: 1,
    date_earned: '2022-03-19',
    // victory_title: 'Alex did 501 pushups',
    victory_story: 'Alex did the pushups in a video. He finished at 523. Heres the link to the video: http://youtube.com',
    verified: 0,
  });
  const [badgeDiameter, setBadgeDiameter] = React.useState('120px');


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
    .then(res => console.log('User 1s Badges\n', res.data))
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










  return (
    <>
    <div className={classes.main}>
      <Badge diameter={badgeDiameter} badgeEarned={badgeEarned}/>
    </div>

    <button onClick={() => getAllBadges()}>Get All badges</button>
    <button onClick={() => getBadgeById(2)}>Get Badge by id 2</button>
    <button onClick={() => getUsersBadges()}>Get Badges for userid 1</button>
    <button onClick={() => addBadgeEarned()}>Add Badge Earned</button>
    <button onClick={() => addBadge()}>Add Badge!</button>
    <button onClick={() => getAllBadgesEarned()}>Get All BADGES EARNED</button>
    </>
  )
};

export default TestPage;
