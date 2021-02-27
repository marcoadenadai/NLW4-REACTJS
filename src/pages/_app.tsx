import '../styles/global.css';
import { ChallengesProvider } from '../contexts/ChallengeContext';
import { CountdownProvider } from '../contexts/CountdownContext';


//arquivo para reaproveitar componentes para todas as paginas, porém é recalculado

function MyApp({ Component, pageProps }) {




  return (
    <Component {...pageProps} />
  );
}

export default MyApp
