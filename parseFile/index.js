const express = require('express');
const { parseFilePath } = require('./fileinfo');
const { parseFullUrl } = require('./urlparser');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.get('/fileinfo', (req, res) => {
  const filepath = req.query.filepath;
  if (!filepath) return res.status(400).json({ error: 'Missing filepath query parameter' });
  try {
    const info = parseFilePath(filepath);
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: 'Could not parse filepath' });
  }
});

app.get('/parseurl', (req, res) => {
  const fullUrl = req.query.url;
  if (!fullUrl) return res.status(400).json({ error: 'Missing url query parameter' });
  try {
    const info = parseFullUrl(fullUrl);
    res.json(info);
  } catch (err) {
    res.status(400).json({ error: 'Invalid URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
