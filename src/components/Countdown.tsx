

import { useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import { CountdownContext } from '../contexts/CountdownContext';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown } = useContext(CountdownContext);

    //verifica se a string nao estiver 2 caracteres & preenche p/ esquerda com zero
    const [minLeft, minRight] = String(minutes).padStart(2, '0').split('');
    const [secLeft, secRight] = String(seconds).padStart(2, '0').split('');

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