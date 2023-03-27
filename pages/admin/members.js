import React from 'react'
import { Context } from '../../globals/context.js';
import AddIcon from '@mui/icons-material/Add';
import classes from '../../styles/AdminMembers.module.css';
import MemberCard from '../../components/MemberCard.js';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';


import axios from 'axios';

const Members = () => {
  const router = useRouter();
  const {userData, setBadgesEarned} = React.useContext(Context);
  const [isLoading, setIsLoading] = React.useState(false);

  const [successType, setSuccessType] = React.useState({});
  const [members, setMembers] = React.useState([]);
  const [badgesEarnedUpdate, setBadgesEarnedUpdate] = React.useState([]);

  React.useEffect(() => {
    console.log('sType: ', successType);
  },[successType]);

React.useEffect(() => {
  axios({url: '/api/users', method: 'GET'})
  .then(res => setMembers(res.data))
  .catch(err => console.warn(err));

    axios({url: `/api/badges/fromuser`, method: 'GET'})
    .then(res => {
      setBadgesEarnedUpdate(res.data);
      setBadgesEarned(res.data);
    })
    .catch(err => console.error(err))
},[]);

const changeUserType = (id, val) => {
  console.log('changing user type(id, value), ', id, val);
  // return;

  axios({url: `/api/users/id/${id}`, method: 'PUT', data: {id, newType: val}})
  .then(res => {
    console.log('success', res.data);
    let successObj = {};
    Object.assign(successObj, successType);
    successObj[`user${id}`] = true;
    setSuccessType(successObj);
  })
  .catch(err => console.error(err));
}


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
                {successType[`user${memberData.id}`] && (
                  <p style={{color: 'green'}}>Successfully Changed Type</p>
                )}

                <div className={classes.typeSelect}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onFocus={e => {
                      console.log('focusing..', memberData.id);
                      if(successType[`user${memberData.id}`]) {
                        let obj = {};
                        Object.assign(obj, successType);
                        delete obj[`user${memberData.id}`];
                        setSuccessType(obj);
                      }
                    }}
                    defaultValue={memberData.member_type}
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