const express = require('express')
const app = express()
const port = 3000
const { validateRegistration } = require('./middleware/validator.middleware');
// middleware
app.use(express.json());
app.post('/register',validateRegistration, (req, res) => {
//   res.send('Hello World!')
const {name ,email,password} = req.body;
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// test with postman and see this error .Give empty {}
// http://localhost:3000/register