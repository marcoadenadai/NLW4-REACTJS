import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);   //tempo do contador
    const [isActive, setIsActive] = useState(false); //status do contador
    const [hasFinished, setHasFinished] = useState(false); //status se finalização

    const minutes = Math.floor(time / 60); //arredonda o número para baixo.
    const seconds = time % 60;

    //verifica se a string nao estiver 2 caracteres & preenche p/ esquerda com zero
    const [minLeft, minRight] = String(minutes).padStart(2, '0').split('');
    const [secLeft, secRight] = String(seconds).padStart(2, '0').split('');


    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout); //cancelando a execução do timeout
        setIsActive(false);
        setTime(0.05 * 60);//setTime(25 * 60);
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

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minLeft}</span><span>{minRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secLeft}</span><span>{secRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button
                    disabled
                    className={`${styles.countdownButton} ${styles.countdownButtonFinished}`}
                >
                    Ciclo encerrado <img src="icons/check.svg" alt="" style={{ padding: '0rem 0rem 0rem 0.5rem' }} />
                </button>
            ) : ( // <> & </> --> fragment, para resolver o caso de limitação em que precisa colocar algo dentro duma div
                    <>
                        { isActive ? ( //exemplo aqui
                            <button
                                type="button"
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountdown}
                            >
                                Abandonar ciclo <img src="icons/close.svg" alt="" />
                            </button>
                        ) : (
                                <button
                                    type="button"
                                    className={styles.countdownButton}
                                    onClick={startCountdown}
                                >
                                    Iniciar um clico
                                </button>
                            )
                        }
                    </>
                )}







        </div>
    );
}