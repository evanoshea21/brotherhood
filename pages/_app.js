import '@/styles/globals.css'
import Layout from '../globals/Layout.js'
import Script from 'next/script'


export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Script src="https://kit.fontawesome.com/ec4acfb01c.js" />
      <Component {...pageProps} />
    </Layout>
  )
}
