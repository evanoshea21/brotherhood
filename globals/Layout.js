import React from 'react'
import {ContextProvider} from '../globals/context.js';
import classes from '../styles/layout.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Drawer from '../components/ui/Drawer.js';
import { useRouter } from 'next/router';



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

  React.useEffect(() => {
    if(router.pathname === '/') {
      setHomeNavStyle({backgroundColor: 'rgba(0,0,0,0)'});
    }
  })

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
    // <ContextContainer>
    <ContextProvider>
      <ThemeProvider theme={theme}>

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
            <Button onClick={routeJoin} sx={{bgColor: 'blue', p: '10px 25px', ml: {sm: '30px'}, color: 'text.primary', fontWeight: '400', fontSize: '1.2rem'}} variant="contained">JOIN</Button>
          </div>
          <div className={classes.drawer}>
          <Drawer dimension='70px' color='text.secondary'/>
          </div>
        </div>

        <div style={homeNavStyle} className={classes.smallNav}>
          <div className={classes.navItems}>
              <Button onClick={routeJoin} sx={{p: '10px 25px', ml: {sm: '30px'}, color: 'text.primary', fontWeight: 700, fontSize: '1.2rem'}} variant="contained">JOIN</Button>
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
    </div>
      </ThemeProvider>
    </ContextProvider>
    // </ContextContainer>
  )
};

export default Layout