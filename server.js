const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let jobs = JSON.parse(fs.readFileSync('jobs.json', 'utf8'));

app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const job = req.body;
  jobs.push(job);
  fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
  res.status(201).json({ message: 'Job added successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});