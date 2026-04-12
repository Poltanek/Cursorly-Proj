import styles from './styles/HeroSection.module.css';

const HeroSection = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}> </h1>
                    <p className={styles.subtitle}>A place to download free malware safe Cursor Packs for creative users!</p>
                    <search className={styles.search}>
                        <input type="text" placeholder="Search for cursor packs..." className={styles.searchInput} />
                        <button className={styles.searchButton}>Search</button>
                    </search>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;