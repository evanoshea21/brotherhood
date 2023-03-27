import React from 'react'
import {ContextProvider, Context} from './context.js';
import classes from '../styles/layout.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {Button, Typography} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Drawer from '../components/ui/Drawer.js';
import { useRouter } from 'next/router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ProfileMenu from '../components/ProfileMenu.js';



const theme = createTheme({
  palette: {
    text:{
      primary: "#800A01",
      secondary: "#B8860B"
    },
    primary: {
      main: '#B8860B', //gold
      // main: '#800A01',
    },
    secondary: {
      main: '#800A01', // maroon
      // main: '#B8860B',
    },
  },
  typography: {
    fontFamily: 'GFS Neohellenic, sans-serif',
  }
});

const Layout = ({children}) => {
  const [homeNavStyle, setHomeNavStyle] = React.useState({});
  const router = useRouter();
  // const userData = {};
  const {userData, handleSignOut} = React.useContext(Context);

  React.useEffect(() => {
    console.log('CURRENT USERDATA: ', userData);
  },[userData]);

    if(router.pathname === '/') {
      if(homeNavStyle.backgroundColor !== 'rgba(0,0,0,0)') {
        setHomeNavStyle({backgroundColor: 'rgba(0,0,0,0)'});
      }
    } else {
      if(Object.keys(homeNavStyle).length) {
        setHomeNavStyle({})
      }
    }

  const routeHome = () => {
    if(router.pathname !== '/') {
      router.push('/')
    }
  }
  const routeJoin = () => {
    if(router.pathname !== '/join') {
      router.push('/join')
    }
  }


  return (

      <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

      {/* NAVBAR */}
      <div className={classes.container}>

        <div style={homeNavStyle} className={classes.bigNav}>
          <div className={classes.logoBox}>
            <img onClick={routeHome} src='/helmetLogo.png'/>
          </div>
          <div className={classes.navItems}>
            <Link className={classes.link} href='/tenets'>Tenets</Link>
            <Link className={classes.link} href='/mission'>Mission</Link>
            <Link className={classes.link} href='/badges'>Badges</Link>
            {userData?.email ? (
              <ProfileMenu userData={userData} diameter='50px'/>
            ) : (
              <>
              <Button onClick={routeJoin} sx={{p: '6px 25px', ml: {sm: '30px'}, color: 'text.primary', fontWeight: 700, fontSize: '1.2rem'}} variant="contained">JOIN</Button>
              <Button onClick={() => router.push('/signin')} sx={{p: '6px 10px', ml: {sm: '10px'}, color: 'text.primary', fontWeight: 700, fontSize: '1.2rem'}} variant="outlined">Sign in</Button>
              </>

            )}
          </div>
          <div className={classes.drawer}>
          <Drawer dimension='70px' color='text.secondary'/>
          </div>
        </div>

        <div style={homeNavStyle} className={classes.smallNav}>
          <div className={classes.navItems}>
            {userData?.email ? (
              <ProfileMenu userData={userData} diameter='50px'/>
              ) : (
              <div style={{display: 'flex', flexDirection: 'column'}}>

                <Typography
                onClick={() => router.push('/signin')}
                sx={{
                  textAlign: 'center', borderRadius: '4px',
                  backgroundColor: 'var(--primary-color)',
                  // border: '2px solid var(--secondary2-color)',
                  ml: {xs: '10px', sm: '30px'}, mb: '8px',
                  py: '8px'
                }}
                color='var(--secondary2-color)'
                >Sign In</Typography>
                <Button onClick={routeJoin} sx={{p: '10px 25px', ml: {xs: '10px', sm: '30px'}, color: 'text.primary', fontWeight: 700, fontSize: '1.2rem'}} variant="contained">JOIN</Button>
              </div>

            )}

          </div>
          <div className={classes.logoBox}>
            <img src='/helmetLogo.png'/>
          </div>
          <div className={classes.drawer}>
            <Drawer dimension='70px' color='text.secondary'/>
          </div>
        </div>

      {/* PAGE CONTENT */}
      {children}

      {/* FOOTER */}
      <div className={classes.footer}>
        This is a footer
      </div>
      <button onClick={() => handleSignOut()} >Sign out</button>
    </div>
    </LocalizationProvider>
      </ThemeProvider>

  )
};

export default Layout;