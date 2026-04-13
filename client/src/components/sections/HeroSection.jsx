import { useState, useEffect } from "react";
import styles from "./styles/HeroSection.module.css";

const HeroSection = () => {
    const [packs, setPacks] = useState([]);
    const [query, setQuery] = useState("");

    // ✅ Fetch from backend
    useEffect(() => {
        fetch("http://localhost:5000/packs")
            .then(res => res.json())
            .then(data => setPacks(data));
    }, []);

    const filteredPacks = packs
        .filter(pack =>
            pack.name.toLowerCase().includes(query.toLowerCase())
        );

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <h1 className={styles.title}>Downloading free cursors (mouse pointers)</h1>
                <p className={styles.description}>
                    This library contains computer mouse cursors for Microsoft Windows systems. 
                    There are two types of cursors supported directly by Windows operating systems: static (.cur) and animated (.ani). 
                    Both types are present in this library. 
                </p>

                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className={styles.results}>
                    {filteredPacks.map((pack) => (
                        <div key={pack._id} className={styles.card}>

                            {pack.image && (
                                <img
                                    src={`http://localhost:5000${pack.image}`}
                                    className={styles.cardImage}
                                />
                            )}

                            <h3>{pack.name}</h3>
                            <p>{pack.description}</p>

                            <a
                                href={`http://localhost:5000${pack.zipFile}`}
                                download
                            >
                                Download
                            </a>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HeroSection;