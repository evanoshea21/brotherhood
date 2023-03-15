import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '../globals/Layout.js';
import axios from 'axios';
import { Context } from '../globals/context.js';

const inter = Inter({ subsets: ['latin'] })

const pageCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '120vh'
};

export default function Home() {
  const { testContext } = React.useContext(Context);

  return (
    <>
      <div style={pageCenter}>
        <h1>This is my home page</h1>
        <p>Test Context: {testContext}</p>
      </div>
    </>

  )
}
