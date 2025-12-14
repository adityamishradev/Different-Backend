const express = require('express')
const app = express()
const port = 3000
const rateLimit = require('express-rate-limit')

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100 ,// limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute'
})
app.use(express.json())
// app.use(limiter)  isse pure app pe rate limit lag jata hai
app.use(limiter)


// simgle route pe rate limit lagana ho to
// app.post('/register',limiter, (req, res) => {  but isko app.use(limiter)remove krna ho tab single use kr sakte hai
app.post('/register', (req, res) => {
res.status(200).send('User registered successfully')    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// It prvent d-dox attacks
// means that it limits the number of requests a client can make to the server in a given time frame