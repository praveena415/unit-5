const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('redis');

const app = express();
app.use(bodyParser.json());

const redisClient = createClient();
redisClient.connect().catch(console.error);

let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' }
];

const CACHE_KEY = 'items:all';

async function checkCache(req, res, next) {
  try {
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      console.log('Cache Hit');
      return res.status(200).json(JSON.parse(cachedData));
    }
    console.log('Cache Miss');
    next();
  } catch (err) {
    console.error(err);
    next();
  }
}
app.get('/items', checkCache, async (req, res) => {

  const data = items;

  await redisClient.set(CACHE_KEY, JSON.stringify(data), { EX: 60 });

  res.status(200).json(data);
});
app.post('/items', async (req, res) => {
  const { name } = req.body;
  const newItem = { id: items.length + 1, name };
  items.push(newItem);

  await redisClient.del(CACHE_KEY);
  console.log('Cache Cleared after POST');

  res.status(201).json(newItem);
});
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const itemIndex = items.findIndex(i => i.id == id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items[itemIndex].name = name;

  await redisClient.del(CACHE_KEY);
  console.log('Cache Cleared after PUT');

  res.status(200).json(items[itemIndex]);
});

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex(i => i.id == id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  const deletedItem = items.splice(itemIndex, 1);

  await redisClient.del(CACHE_KEY);
  console.log('Cache Cleared after DELETE');

  res.status(200).json({ message: 'Item deleted', deletedItem });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));