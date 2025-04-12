const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ensureDirectoryExistence = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        const dir = path.join(__dirname, "../../../public/profile_images/");
        ensureDirectoryExistence(dir);
        cb(null, dir);
    },
    filename: (_, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const labStorage = multer.diskStorage({
    destination: (_, __, cb) => {
        const dir = path.join(__dirname, "../../../public/labImages/");
        ensureDirectoryExistence(dir);
        cb(null, dir);
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });
const uploadLab = multer({ storage: labStorage });

module.exports = { upload, uploadLab };
