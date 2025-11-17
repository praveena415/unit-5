const express = require('express');
const logger = require('./eventLogger');
const { waitMessage } = require('./delay');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.get('/emit', (req, res) => {
  const message = req.query.message || 'No message provided';
  const timestamp = new Date().toISOString();

  logger.emit('log', { message });

  res.json({
    status: 'Event logged',
    timestamp
  });
});

app.get('/delay', async (req, res) => {
  const message = req.query.message || 'No message provided';
  const time = Number(req.query.time) || 0;

  try {
    const result = await waitMessage(message, time);
    res.json({
      message: result,
      delay: `${time}ms`
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
