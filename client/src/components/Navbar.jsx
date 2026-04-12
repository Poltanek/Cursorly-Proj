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
                    Cursorly
                </a>

                {/* Navbar Links (always visible) */}
                <nav className={styles.navbar}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link to="/" className={styles.link}>HOME</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/blogpage" className={styles.link}>RELEASES</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/aboutpage" className={styles.link}>ABOUT</Link>
                        </li>
                    </ul>
                </nav>

            </div>
        </header>
    );
};

export default Navbar;