const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const AdmZip = require("adm-zip");
const path = require("path");
const cors = require("cors");

const CursorPack = require("./Models/CursorPack");

const app = express();
app.use(cors());

// ✅ Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cursorDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// ✅ Serve uploaded files
app.use("/uploads", express.static("uploads"));

// ✅ Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + path.extname(file.originalname);
        cb(null, unique);
    }
});

const upload = multer({ storage });

// ✅ Upload route
app.post("/upload", upload.fields([
    { name: "zip", maxCount: 1 },
    { name: "image", maxCount: 1 }
]), async (req, res) => {
    try {
        const zipFile = req.files["zip"][0];
        const imageFile = req.files["image"]?.[0];

        // ✅ Validate zip contents
        const zip = new AdmZip(zipFile.path);
        const entries = zip.getEntries();

        const allowed = [".cur", ".ani", ".png", ".jpg", ".jpeg"];

        for (let entry of entries) {
            if (entry.isDirectory) continue;

            const ext = path.extname(entry.entryName).toLowerCase();

            // ❗ Ignore harmless files
            if (entry.entryName.startsWith("__MACOSX")) continue;

            if (!allowed.includes(ext)) {
                console.log("Blocked file:", entry.entryName); // 👈 DEBUG
                return res.status(400).json({
                    error: `Invalid file: ${entry.entryName}`
                });
            }
        }

        // ✅ Save to MongoDB
        const newPack = new CursorPack({
            name: req.body.name,
            description: req.body.description,
            image: imageFile ? `/uploads/${imageFile.filename}` : null,
            zipFile: `/uploads/${zipFile.filename}`
        });

        await newPack.save();

        res.json(newPack);

    } catch (err) {
        res.status(500).json({ error: "Upload failed" });
    }
});

// ✅ Get all packs
app.get("/packs", async (req, res) => {
    const packs = await CursorPack.find().sort({ createdAt: -1 });
    res.json(packs);
});

// ✅ Start server
app.listen(5000, () => console.log("Server running on port 5000"));