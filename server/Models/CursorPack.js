const mongoose = require("mongoose");

const cursorPackSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    zipFile: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("CursorPack", cursorPackSchema);