import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps { children: ReactNode; }

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
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExp, setCurrentExp] = useState(30);
    const [challengesCompleted, setChallengesCompleted] = useState(2);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const expToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
    }

    function resetChallenge() { //function called when user fails the challenge!
        setActiveChallenge(null);
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
                expToNextLevel
            }}
        >
            {children}
        </ChallengesContext.Provider>
    );
}