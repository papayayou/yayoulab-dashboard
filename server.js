const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const APPS_FILE = path.join(__dirname, 'apps.json');
const FAVS_FILE   = path.join(__dirname, 'favorites.json');
const ALERTS_FILE = path.join(__dirname, 'alerts.json');

app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname));

app.post('/save-apps', (req, res) => {
  try {
    fs.writeFileSync(APPS_FILE, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/alerts', (req, res) => {
  try {
    const data = fs.existsSync(ALERTS_FILE) ? JSON.parse(fs.readFileSync(ALERTS_FILE)) : [];
    res.json(data);
  } catch { res.json([]); }
});

app.post('/alerts', (req, res) => {
  try {
    fs.writeFileSync(ALERTS_FILE, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get('/favorites', (req, res) => {
  try {
    const data = fs.existsSync(FAVS_FILE) ? JSON.parse(fs.readFileSync(FAVS_FILE)) : [];
    res.json(data);
  } catch { res.json([]); }
});

app.post('/favorites', (req, res) => {
  try {
    fs.writeFileSync(FAVS_FILE, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.listen(80, () => console.log('Dashboard on :80'));
