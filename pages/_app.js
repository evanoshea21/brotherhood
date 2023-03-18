import '@/styles/globals.css'
import Layout from '../globals/Layout.js'
import Script from 'next/script'
import { ContextProvider } from '../globals/context.js';


export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Script src="https://kit.fontawesome.com/ec4acfb01c.js" />
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  )
}
