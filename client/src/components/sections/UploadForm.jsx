import { useState } from "react";
import axios from "axios";
import styles from "./styles/UploadForm.module.css";

const UploadForm = ({ setPacks }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [zipFile, setZipFile] = useState(null);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");

    const validateFiles = () => {
        if (!zipFile) return "ZIP file required";
        if (!zipFile.name.endsWith(".zip")) return "Only zip allowed";
        if (zipFile.size > 10 * 1024 * 1024) return "Max 10MB";

        if (image) {
            if (!image.type.startsWith("image/")) return "Invalid image";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const err = validateFiles();
        if (err) {
            setError(err);
            return;
        }

        setError("");

        const formData = new FormData();
        formData.append("zip", zipFile);
        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);

        try {
            const res = await axios.post("http://localhost:5000/upload", formData, {
                onUploadProgress: (e) => {
                    const percent = Math.round((e.loaded * 100) / e.total);
                    setProgress(percent);
                }
            });

            alert("Uploaded!");

            // ✅ Add to homepage instantly
            setPacks(prev => [
                {
                    name,
                    description,
                    image: image ? URL.createObjectURL(image) : null,
                    createdAt: new Date()
                },
                ...prev
            ]);

            alert("Uploaded!");

        } catch (err) {
            setError("Upload failed");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Upload Cursor Pack</h2>

            <form onSubmit={handleSubmit} className={styles.form}>

                {error && <p className={styles.error}>{error}</p>}

                <input
                    type="text"
                    placeholder="Pack Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    textarea="Upload ZIP file"
                    type="file"
                    accept=".zip"
                    onChange={(e) => setZipFile(e.target.files[0])}
                />

                <input
                    textarea="Upload Preview Image (optional)"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        width="150"
                    />
                )}

                {/* ✅ Progress bar */}
                {progress > 0 && (
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}

                <button type="submit">Upload</button>

            </form>
        </div>
    );
};

export default UploadForm;