import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios';
import { Context } from '../globals/context.js';
import classes from '../styles/Join.module.css';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })

const pageCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '120vh',
  fontSize: '4rem'
};

export default function Join() {
  const { testContext } = React.useContext(Context);
  const router = useRouter();

  const routePage = (path) => {
    router.push(path);
  }

  return (
    <>
    <div className={classes.main} style={pageCenter}>JOIN</div>
    </>

  )
}
