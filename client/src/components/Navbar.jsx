import { Link } from 'react-router-dom';
import styles from './styles/Navbar.module.css';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                
                {/* Logo */}
                <a href="/" className={styles.logo}>
                    Cursorly.
                </a>

                {/* Navbar Links (always visible) */}
                <nav className={styles.navbar}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link to="/" className={styles.link}>Home</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/Releases" className={styles.link}>Releases</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/aboutpage" className={styles.link}>About Cursorly</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/learnPage" className={styles.link}>Learn</Link>
                        </li>
                    </ul>
                </nav>

                <button className={styles.UploadBtn} onClick={() => (window.location.href = '/UploadPage')}>
                    Upload
                </button>

            </div>
        </header>
    );
};

export default Navbar;