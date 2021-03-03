import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { ChallengesContext } from "./ChallengeContext";


interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(25 * 60);   //tempo do contador
    const [isActive, setIsActive] = useState(false); //status do contador
    const [hasFinished, setHasFinished] = useState(false); //status se finalização

    const minutes = Math.floor(time / 60); //arredonda o número para baixo.
    const seconds = time % 60;


    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout); //cancelando a execução do timeout
        setIsActive(false);
        setTime(25 * 60);//setTime(0.05 * 60);
        setHasFinished(false);
    }

    //arg1 = função a ser executada,  arg2= quando executar
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000); //executar uma função depois de um timeout (1000ms)
        }
        else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]); //toda vez que o estado 'active' e 'time' mudar ele vai executar essa função



    //----------------------------------------------------------------
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );


}
