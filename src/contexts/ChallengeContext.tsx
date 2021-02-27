import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExp: number;
    challengesCompleted: number;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExp: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    expToNextLevel: number;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExp, setCurrentExp] = useState(rest.currentExp ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const expToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []) //side-effect, quando passo um array vazio ele executa a primera função uma única vez
    //quando esse componente for exibido em tela

    useEffect(() => {
        Cookies.set('level', level.toString());
        Cookies.set('currentExp', currentExp.toString());
        Cookies.set('challengesCompleted', challengesCompleted.toString());
    }, [level, currentExp, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            console.log("SEND NOTIFCATION!");
            new Notification('Novo desafio!', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() { //function called when user fails the challenge!
        setActiveChallenge(null);
    }

    function completedChallenge() {
        if (!activeChallenge)
            return;

        const { amount } = activeChallenge;

        let finalExp = currentExp + amount;//let it change

        if (finalExp >= expToNextLevel) {
            levelUp();
            finalExp -= expToNextLevel;
        }

        setCurrentExp(finalExp);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }


    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExp,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                expToNextLevel,
                completedChallenge,
                closeLevelUpModal
            }}
        >
            {children}

            { isLevelUpModalOpen && <LevelUpModal />}

        </ChallengesContext.Provider>
    );
}