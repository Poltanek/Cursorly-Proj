import styles from './styles/HeroSection.module.css';

const HeroSection = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Welcome to Midnight Manuscripts</h1>
                    <p className={styles.subtitle}>Discover the world of indie music with us.</p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;