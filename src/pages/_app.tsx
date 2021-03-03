import '../styles/global.css';
import { ChallengesProvider } from '../contexts/ChallengeContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import Head from 'next/head';

//arquivo para reaproveitar componentes para todas as paginas, porém é recalculado

function MyApp({ Component, pageProps }) {




  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
