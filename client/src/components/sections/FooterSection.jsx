import styles from './styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>© {new Date().getFullYear()} Cursorly. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
