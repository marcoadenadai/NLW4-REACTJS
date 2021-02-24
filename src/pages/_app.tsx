import '../styles/global.css';
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengeContext';


//arquivo para reaproveitar componentes para todas as paginas, porém é recalculado

function MyApp({ Component, pageProps }) {




  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp
