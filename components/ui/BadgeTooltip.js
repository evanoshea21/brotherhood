import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { dateParsed } from '../../globals/utils.js';
import classes from '../../styles/tooltip.module.css';

// const LightTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: theme.palette.common.white,
//     color: 'rgba(0, 0, 0, 0.87)',
//     boxShadow: theme.shadows[1],
//     fontSize: 11,
//   },
// }));

// const BootstrapTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} arrow classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.arrow}`]: {
//     color: theme.palette.common.black,
//   },
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: theme.palette.common.black,
//   },
// }));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 340,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

// Click <a href="#myContent">here</a> to scroll to the myContent section.

// <div id="myContent">

export default function HtmlTooltipUI({children, title, rundown, date_earned, story, verified, badge_id, xp}) {

  const [dateStr, setDateStr] = React.useState('');

  React.useEffect(() => {
    let dateObj = dateParsed(date_earned);
    setDateStr(`${dateObj.monthStr} ${dateObj.date}, ${dateObj.year}`);
  },[]);

  return (
    <HtmlTooltip
        title={
          // <React.Fragment>
          <div className={classes.badgeTooltip} >

            <Typography textAlign='center' fontSize='2rem' color="inherit">{title}</Typography>

            <div className={classes.dateAndXp}>
              <Typography fontSize='1rem' color="inherit">
                {dateStr}
              </Typography>
              <Typography fontSize='1rem' color="inherit">
                |
              </Typography>
              <Typography fontWeight='800' fontSize='1rem' color="inherit">
                {xp} XP
              </Typography>
            </div>
            <Typography textAlign='center' color={verified ? 'green' : 'orange'} fontSize='1rem'>
              {verified ? 'Verified' : 'Not Verified'}
            </Typography>
            <Typography sx={{pb: '10px'}} fontSize='1.2rem' color="inherit">
              <strong style={{paddingRight: '10px'}}>Info:</strong> {rundown}
            </Typography>
            <Typography sx={{borderTop: '2px solid grey', p: '20px 5px'}} fontSize='1.3rem' color="inherit">
              {story}
            </Typography>
            <div className={classes.btn}>
              <Button href={`/badges#badges-${badge_id}`} sx={{p: '10px', m: '5px', backgroundColor: 'var(--primary-color)'}}>View Badge Info</Button>
            </div>
          </div>
          // </React.Fragment>
        }
      >
        {/* <button>Hello</button> */}
        {children}
      </HtmlTooltip>
  )
}
//   function CustomizedTooltips() {
//   return (
//     <div>
//       <LightTooltip title="Add">
//         <Button>Light</Button>
//       </LightTooltip>
//       <BootstrapTooltip title="Add">
//         <Button>Bootstrap</Button>
//       </BootstrapTooltip>
//       <HtmlTooltip
//         title={
//           <React.Fragment>
//             <Typography color="inherit">Tooltip with HTML</Typography>
//             <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
//             {"It's very engaging. Right?"}
//           </React.Fragment>
//         }
//       >
//         <Button>HTML</Button>
//       </HtmlTooltip>
//     </div>
//   );
// }