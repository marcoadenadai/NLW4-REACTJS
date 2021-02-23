import styles from '../styles/components/Profile.module.css'
export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/marcoadenadai.png" alt="Marco Antonio" />
            <div>
                <strong>Marco Antonio</strong>
                <p><img src="icons/level.svg" alt="" />Level 1</p>
            </div>
        </div>
    );
}