const mongoose = require("mongoose");

const CursorPackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: null },          // secure download URL
    zipFile: { type: String, required: true },       // secure download URL
    hash: { type: String, required: true },          // SHA-256 hash of ZIP
    originalName: { type: String, required: true },  // original filename
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CursorPack", CursorPackSchema);
