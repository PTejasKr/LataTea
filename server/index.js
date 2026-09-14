import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const PUBLISHED_FILE = path.join(DATA_DIR, 'published.json');
const DRAFT_FILE = path.join(DATA_DIR, 'draft.json');

// Ensure files exist initially
if (!fs.existsSync(PUBLISHED_FILE)) {
  fs.writeFileSync(PUBLISHED_FILE, JSON.stringify(null));
}
if (!fs.existsSync(DRAFT_FILE)) {
  fs.writeFileSync(DRAFT_FILE, JSON.stringify(null));
}

app.get('/api/cms/published', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(PUBLISHED_FILE, 'utf8'));
    res.json(data);
  } catch (err) {
    res.json(null);
  }
});

app.get('/api/cms/draft', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DRAFT_FILE, 'utf8'));
    res.json(data);
  } catch (err) {
    res.json(null);
  }
});

app.post('/api/cms/published', (req, res) => {
  try {
    fs.writeFileSync(PUBLISHED_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cms/draft', (req, res) => {
  try {
    fs.writeFileSync(DRAFT_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log('CMS Backend running on port ' + PORT);
});

