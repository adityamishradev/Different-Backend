const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors());// Allow frontend requests
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
