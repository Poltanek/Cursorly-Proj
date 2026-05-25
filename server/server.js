const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const AdmZip = require("adm-zip");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const mime = require("mime-types");

const CursorPack = require("./Models/CursorPack");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect("mongodb+srv://adamtanweer4_db_user:Rimuru101OP@cursorlycluster.ubaxb0c.mongodb.net/cursorly?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));

// Ensure secure storage dir exists
const SECURE_DIR = path.join(__dirname, "secure_storage");
if (!fs.existsSync(SECURE_DIR)) {
    fs.mkdirSync(SECURE_DIR);
}

// ❗ Do NOT expose secure_storage statically
// app.use("/secure_storage", express.static("secure_storage")); // NO

// SHA-256 helper
function sha256File(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash("sha256");
        const stream = fs.createReadStream(filePath);

        stream.on("data", chunk => hash.update(chunk));
        stream.on("end", () => resolve(hash.digest("hex")));
        stream.on("error", reject);
    });
}

// ZIP entry validation
function validateZipEntries(entries) {
    const allowed = [".cur", ".ani", ".png", ".jpg", ".jpeg"];

    for (let entry of entries) {
        if (entry.isDirectory) continue;

        const name = entry.entryName;

        // Block path traversal
        if (name.includes("..") || name.startsWith("/") || name.startsWith("\\")) {
            return `Blocked dangerous path: ${name}`;
        }

        // Ignore MacOS junk
        if (name.startsWith("__MACOSX")) continue;

        const ext = path.extname(name).toLowerCase();

        if (!allowed.includes(ext)) {
            return `Invalid file inside ZIP: ${name}`;
        }
    }

    return null;
}

// Multer storage (secure dir + UUID filenames)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, SECURE_DIR);
    },
    filename: (req, file, cb) => {
        const extFromMime = mime.extension(file.mimetype);
        const ext = extFromMime || path.extname(file.originalname).replace(".", "") || "bin";
        const safeName = uuidv4() + "." + ext;
        cb(null, safeName);
    }
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.fields([
    { name: "zip", maxCount: 1 },
    { name: "image", maxCount: 1 }
]), async (req, res) => {
    try {
        const zipFile = req.files["zip"]?.[0];
        const imageFile = req.files["image"]?.[0];

        if (!zipFile) {
            return res.status(400).json({ error: "ZIP file is required" });
        }

        // Basic MIME validation for ZIP
        if (zipFile.mimetype !== "application/zip" &&
            zipFile.mimetype !== "application/x-zip-compressed") {
            return res.status(400).json({ error: "Invalid ZIP MIME type" });
        }

        // Optional: validate image MIME
        if (imageFile && !imageFile.mimetype.startsWith("image/")) {
            return res.status(400).json({ error: "Invalid image MIME type" });
        }

        // Validate ZIP contents
        const zip = new AdmZip(zipFile.path);
        const entries = zip.getEntries();

        const zipError = validateZipEntries(entries);
        if (zipError) {
            return res.status(400).json({ error: zipError });
        }

        // Generate SHA-256 hash of the ZIP file
        const fileHash = await sha256File(zipFile.path);

        // Save metadata + hash to MongoDB
        const newPack = new CursorPack({
            name: req.body.name,
            description: req.body.description,
            image: imageFile ? `/download/image/${imageFile.filename}` : null,
            zipFile: `/download/zip/${zipFile.filename}`,
            hash: fileHash,
            originalName: zipFile.originalname
        });

        await newPack.save();

        res.json(newPack);

    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: "Upload failed" });
    }
});

// Download ZIP with integrity check
app.get("/download/zip/:filename", async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(SECURE_DIR, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found" });
        }

        const pack = await CursorPack.findOne({ zipFile: `/download/zip/${filename}` });
        if (!pack) {
            return res.status(404).json({ error: "Pack not found" });
        }

        // Recompute hash
        const currentHash = await sha256File(filePath);

        if (currentHash !== pack.hash) {
            return res.status(400).json({ error: "Integrity check failed" });
        }

        res.download(filePath, pack.originalName);

    } catch (err) {
        console.error("Download error:", err);
        res.status(500).json({ error: "Download failed" });
    }
});

// Download image (no hash check, but still from secure dir)
app.get("/download/image/:filename", async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(SECURE_DIR, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Image not found" });
        }

        res.sendFile(filePath);

    } catch (err) {
        console.error("Image download error:", err);
        res.status(500).json({ error: "Image download failed" });
    }
});

// Get all packs
app.get("/packs", async (req, res) => {
    try {
        const packs = await CursorPack.find().sort({ createdAt: -1 });
        res.json(packs);
    } catch (err) {
        console.error("Get packs error:", err);
        res.status(500).json({ error: "Failed to fetch packs" });
    }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
