import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import style from '../styles/pages/Home.module.css';
import { GetServerSideProps } from 'next';
import { ChallengesProvider } from '../contexts/ChallengeContext';

interface HomeProps {
  level: number;
  currentExp: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  console.log(props);
  return (
    <ChallengesProvider
      level={props.level}
      currentExp={props.currentExp}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={style.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

//Toda chamada API ou acesso à serviço externo deve ser chamada pelo Next.js
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //função que deu surgimento ao Next.JS -> solução ao SEO (search engine optimization)
  const user = {
    level: 1,
    currentExp: 50,
    challengesCompleted: 2,
  }

  const { level, currentExp, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExp: Number(currentExp),
      challengesCompleted: Number(challengesCompleted),
    }
  }
} 