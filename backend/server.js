// server.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Enable CORS so Angular frontend can call this API
app.use(cors());

// Folder where images will be stored
const UPLOADS_FOLDER = path.join(process.cwd(), 'uploads');

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER);
}

// Multer config: store files in /uploads with original filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_FOLDER),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Route: Upload image
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ message: 'Upload successful', file: req.file.filename });
});

// Route: Get all images
app.get('/api/images', (req, res) => {
    fs.readdir(UPLOADS_FOLDER, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to fetch images' });
        }
        // Return list of URLs so Angular can display them
        const imageUrls = files.map((file) => `http://localhost:${PORT}/uploads/${file}`);
        res.json(imageUrls);
    });
});

// Serve uploaded images statically
app.use('/uploads', express.static(UPLOADS_FOLDER));

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
