import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

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

export default function HtmlTooltipUI({children, title, rundown, date_earned, story, verified, badge_id}) {

  return (
    <HtmlTooltip
        title={
          <React.Fragment>
            <Typography fontSize='2rem' color="inherit">{title}</Typography>
            <Typography fontSize='1rem' color="inherit">
              Earned on {date_earned}
            </Typography>
            <Typography fontSize='1.2rem' color="inherit">
              Desc: {rundown}
            </Typography>
            <Typography fontSize='1.4rem' color="inherit">
              Story: {story}
            </Typography>
            <Typography color={verified ? 'green' : 'orange'} fontSize='1rem'>
              {verified ? 'Verified' : 'Not Verified'}
            </Typography>
            <Button href={`/badges#badges-${badge_id}`} sx={{color: 'lightblue'}}>View Badge Info</Button>
          </React.Fragment>
        }
      >
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