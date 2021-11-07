// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const axios = require('axios')
// Middleware 
app.use(express.json()) // decode JSON-formatted incoming POST data
//CORS stuff 
app.use((req, res, next) => {
  const allowedOrigins = [
      `http://localhost`,
      `http://localhost:3000`,
     
  ]
  const { origin } = req.headers
  if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin)
  }
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

// GET all Friends
// route for HTTP GET requests to /json-example
app.get("/Friends", (req, res,next) => {
    // aquire Friends from database (for now we are calling mockaroo which gives us a random JSON array of friends) 
    axios
    .get("https://my.api.mockaroo.com/friends.json?key=56f355b0")
    .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
  })

// POST a new friend
// Add it to the list of friends for the specific user that is currently logged in
app.post("/Friends", (req, res) => {
  const data = {
    status: "Posted", 
    friendAdded: req.body.friendAdded
  }
  res.json(data)
})

//GET all Groups
app.get("/CreateGroup", (req, res,next) => {
  // aquire Friends from database (for now we are calling mockaroo which gives us a random JSON array of friends) 
  axios
  .get("https://my.api.mockaroo.com/test.json?key=34e7d950")
  .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
  .catch(err => next(err)) // pass any errors to express
})

app.post("/CreateGroup", (req, res)=>{
  console.log("Create Group got called")
})
// GET all transactions
app.get("/Transactions", (req, res, next) => {
    // aquire Friends from database (for now we are calling mockaroo)
    axios
    .get("https://my.api.mockaroo.com/transactions.json?key=56f355b0")
    .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
    
  })

// POST new transaction (when user clicks expense)
app.post("/Transactions", (req, res) => {
  const data = {
    status: "Posted", 
    date: req.body.date, 
    group: req.body.group,
    charger: req.body.charger,
    chargee: req.body.chargee,
    amount: req.body.amount

  }
  res.json(data)

})
// GET current group members
app.get("/CurrentGroupMembers", (req, res, next) => {
     // aquire Friends from database (for now we are calling mockaroo)
     axios
     .get("https://api.mockaroo.com/api/7f5697d0?count=10&key=1d7007e0")
     // @TODO change the .chargee below when working on database 
     .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
     .catch(err => next(err)) // pass any errors to express

   })


app.get("/CurrentGroupMembers", (req, res, next) => {
    // aquire Friends from database (for now we are calling mockaroo)
    axios
    .get("https://api.mockaroo.com/api/7f5697d0?count=10&key=1d7007e0")
    // @TODO change the .chargee below when working on database 
    .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
    
  })


// we will put some server logic here later...
// export the express app we created to make it available to other modules
module.exports = app
