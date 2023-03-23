import React from 'react'
import { Context } from '../../globals/context.js';
import AddIcon from '@mui/icons-material/Add';
import classes from '../../styles/AdminMembers.module.css';
import MemberCard from '../../components/MemberCard.js';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router';


import axios from 'axios';

const Members = () => {
  const router = useRouter();
  const {userData, badgesEarned, setBadgesEarned} = React.useContext(Context);

  const [members, setMembers] = React.useState([]);
  const [badgesEarnedUpdate, setBadgesEarnedUpdate] = React.useState(badgesEarned);

React.useEffect(() => {
  axios({url: '/api/users', method: 'GET'})
  .then(res => setMembers(res.data))
  .catch(err => console.warn(err));

  if(!badgesEarned.length) {
    axios({url: `/api/badges/fromuser`, method: 'GET'})
    .then(res => {
      setBadgesEarnedUpdate(res.data);
      setBadgesEarned(res.data);
    })
    .catch(err => console.error(err))
  }
},[]);

const changeUserType = (id, val) => {
  console.log('changing user type(id, value), ', id, val)
}

React.useEffect(() => {
  console.log('badges earned: ', badgesEarnedUpdate);
},[badgesEarnedUpdate]);

  return (
    <div className={classes.main}>
      <h1>Members Page</h1>
      <div>
        <h1>Members</h1>
        <div className={classes.members}>
        {badgesEarnedUpdate.length && members.map(memberData => {
          return (
            <div className={classes.card}>
              <MemberCard key={memberData.id} memberData={memberData} badgesEarned={badgesEarnedUpdate}/>

              <div className={classes.adminEditBox}>

                <div className={classes.trashBtn}>
                  <i class="fa-solid fa-trash"></i>
                  <p>Delete User</p>
                </div>

                <div className={classes.badgeBtn} onClick={() => router.push({
          pathname: '/addbadgeEarned',
          query: { userid: memberData.id, fname: memberData.fname, lname: memberData.lname,
          pic: memberData.pic }
        })} >
                  <i class="fa-solid fa-medal"></i>
                  <p>Add Badge</p>
                </div>

                <div className={classes.typeSelect}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue='admin'
                    label="User Type"
                    onChange={(e) => {changeUserType(memberData.id, e.target.value)}}
                    >
                    <MenuItem value='limited'>Limited</MenuItem>
                    <MenuItem value='member'>Member</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='superadmin'>Superadmin</MenuItem>
                  </Select>
                </div>

              </div>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}

export default Members;