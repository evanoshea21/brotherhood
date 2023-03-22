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










  return (
    <>
    <div className={classes.main}>
      <Badge diameter={badgeDiameter} badgeEarned={badgeEarned}/>
    </div>

    <button onClick={() => getAllBadges()}>Get All badges</button>
    <button onClick={() => getBadgeById(2)}>Get Badge by id 2</button>
    <button onClick={() => getUsersBadges()}>Get Badges for userid 1</button>
    </>
  )
};

export default TestPage;
