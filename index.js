require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: 'Nahid', age: 30 },
  { id: 2, name: 'Ayxan', age: 25 },
  { id: 3, name: 'Mahmud', age: 40 }
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.json({ message: 'Əlavə edildi', user });
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.json({ message: 'Silindi' });
});

app.post('/secure', (req, res) => {
  const { key } = req.body;
  if (key === process.env.SECRET_KEY) {
    res.json({ message: 'Uğurludur' });
  } else {
    res.status(403).json({ error: 'İcazə yoxdur' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server http://localhost:${process.env.PORT} ünvanında işləyir`);
});
