const express = require('express');
const app = express();
const port = process.env.port || process.env.PORT || 3000
const cors = require('cors');
const path = require('path');

const build = path.join(__dirname, '..', 'client', 'build');

app.use(cors());

app.use(express.static(build));

app.get('*', (req, res) => {
  res.sendFile(path.join(build, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});