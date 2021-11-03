// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const axios = require('axios')
// Middleware 
app.use(express.json()) // decode JSON-formatted incoming POST data
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


// we will put some server logic here later...
// export the express app we created to make it available to other modules
module.exports = app