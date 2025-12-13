const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config();
const db = require('./config/db');
var cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');

// Connect to the database
db();
app.use(cookieParser())


// routes
app.use(express.json());
app.use('/api/auth',authRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
