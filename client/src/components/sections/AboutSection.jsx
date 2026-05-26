import styles from './styles/AboutSection.module.css';

const AboutSection = () => {
    return (
        <section className={styles.aboutSection}>
            
            <div className={styles.container}>
                <h2 className={styles.title}>What is Cursorly?</h2>
                <p className={styles.description}>
                    Cursorly is a web‑based platform designed to make uploading, validating, and sharing cursor packs simple and secure. 
                    The system focuses on safe file handling, ZIP integrity verification, and a clean user experience. 
                    Cursorly ensures that every cursor pack uploaded by users is authentic, unmodified, and stored safely.
                </p>
            </div>

            <div className={styles.container}>
                <h3 className={styles.subtitle}>Why Cursor Packs?</h3>
                <p className={styles.description}>
                    Cursor packs allow users to customise the appearance of their mouse pointer. 
                    These packs often contain multiple cursor files, animations, and preview images. 
                    Cursorly provides a structured way to upload, store, and distribute these packs without the risk of corruption or tampering.
                </p>
            </div>

            <div className={styles.container}>
                <h3 className={styles.subtitle}>How Cursorly Works</h3>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Users upload a ZIP file containing cursor assets.</li>
                    <li className={styles.listItem}>The system validates the ZIP contents to ensure only safe file types are included.</li>
                    <li className={styles.listItem}>A SHA‑256 hash is generated to guarantee file integrity.</li>
                    <li className={styles.listItem}>Metadata such as name, description, and preview image are stored.</li>
                    <li className={styles.listItem}>Users can browse and download verified cursor packs.</li>
                </ul>
            </div>

            <div className={styles.container}>
                <h3 className={styles.subtitle}>Security & Integrity</h3>
                <p className={styles.description}>
                    Cursorly uses a hashing system to ensure that every uploaded pack remains unchanged. 
                    When a user downloads a pack, the system re‑checks the ZIP file against its original hash. 
                    If any modification or corruption is detected, the download is blocked. 
                    This ensures that all packs remain authentic and safe for users.
                </p>
            </div>

            <div className={styles.container}>
                <h3 className={styles.subtitle}>Technologies Used</h3>
                <p className={styles.description}>
                    Cursorly is built using a modern full‑stack architecture:
                </p>
                <ul className={styles.list}>
                    <li className={styles.listItem}>React for the frontend interface</li>
                    <li className={styles.listItem}>Node.js & Express for backend logic</li>
                    <li className={styles.listItem}>MongoDB for storing pack metadata</li>
                    <li className={styles.listItem}>Multer for secure file uploads</li>
                    <li className={styles.listItem}>SHA‑256 hashing for integrity verification</li>
                </ul>
            </div>

            <div className={styles.container}>
                <h3 className={styles.subtitle}>Project Goal</h3>
                <p className={styles.description}>
                    The goal of Cursorly is to provide a reliable, secure, and user‑friendly platform for managing cursor packs. 
                    It demonstrates modern web development practices, secure file handling, and a focus on user experience.
                </p>
            </div>

        </section>
    );
};

export default AboutSection;
