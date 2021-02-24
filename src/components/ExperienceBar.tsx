import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css'; //css modules (React)

export function ExperienceBar() {
    const { currentExp, expToNextLevel } = useContext(ChallengesContext);
    const percentToNextLevel = Math.round((currentExp / expToNextLevel) * 100);

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}>
                    <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                        {currentExp} xp
                    </span>
                </div>
            </div>
            <span>{expToNextLevel} xp</span>
        </header>
    );
};