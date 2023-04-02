import React from 'react'
import { InlineWidget, PopupButton } from "react-calendly";
import { Context } from '../globals/context.js';

import axios from 'axios';


const Schedule = () => {

  const {userData} = React.useContext(Context);

  if(!userData?.email) {
    return (
      <h1>Sorry, must be logged in..</h1>
    )
  }

  return (
    <div>

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
  )
}

export default Schedule;
