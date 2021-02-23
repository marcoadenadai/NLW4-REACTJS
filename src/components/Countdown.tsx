import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const [time, setTime] = useState(25 * 60);   //tempo do contador
    const [active, setActive] = useState(false); //status do contador

    const minutes = Math.floor(time / 60); //arredonda o número para baixo.
    const seconds = time % 60;

    //verifica se a string nao estiver 2 caracteres & preenche p/ esquerda com zero
    const [minLeft, minRight] = String(minutes).padStart(2, '0').split('');
    const [secLeft, secRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setActive(true);
    }

    //arg1 = função a ser executada,  arg2= quando executar
    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000); //executar uma função depois de um timeout (1000ms)
        }
    }, [active, time]); //toda vez que o estado 'active' e 'time' mudar ele vai executar essa função

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

            <button
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
            >
                Iniciar um ciclo
            </button>
        </div>
    );
}