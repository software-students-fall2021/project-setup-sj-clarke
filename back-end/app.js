// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const axios = require('axios')
const morgan = require('morgan')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// connection to mongoose
//mongoose.connect('mongodb+srv://tripsplit:tripsplit123@tripsplit.5k1jw.mongodb.net/TripSplit?retryWrites=true&w=majority'); 
const { Schema } = mongoose;
require("dotenv").config({ silent: true })
const db = process.env.REACT_APP_DB;
mongoose.connect(`${db}`);
//required for authentication with JSON Web Tokens
const jwt = require("jsonwebtoken")
const passport = require("passport")
app.use(passport.initialize())

//use JWT strategy within passport for authentication and handling
const { jwtOptions, jwtStrategy } = require("./jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)

// set up some middleware
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(cookieParser()) // useful middleware for dealing with cookies

// the following cors setup is important when working with cookies on your local machine
app.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true })) // allow incoming requests only from a "trusted" host


//initializing User schema 
const user_schema = new Schema ({
  username:  String, // String is shorthand for {type: String}
  password: String,
  fName:   String,
  lName: String,
  currentGroup: String,
  allGroups: [String],
  friends: [String]
  
});

// initializing Group schema 
const group_schema = new Schema({
  name:  String, 
  date: Date,
  members: [String],
  transactions:  [ 
    {
        charger: String, 
        chargee: [String], 
        amount: String, 
        date: Date, 
        description: String
      }
  ],
});
// initializing mongoose models 
const user = mongoose.model('user')
//const group = mongoose.model('group')

// // example posting a group 
//   const group_practice = new group({
//     name:  "Cannes", 
//     date: "2018",
//     members: ["sjclarke", "clarkeAndrew"], 
//     transactions:  [ 
//       {
//         charger: "clarkeAndrew", 
//         chargee: "sjclarke", 
//         amount: "90", 
//         date: "12/04/2018", 
//         description: "Coffee and breakfast"
//       }
//     ]
//   }
//   )
  // user_practice.save().then(() => console.log("POSTED USER")); 

 // group_practice.save().then(() => console.log("POSTED GROUP")); 

// Middleware 
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(morgan('dev'))
app.use(bodyParser.json())

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

// GET all Friends of a specific user 
app.get("/Friends/:usernameInput", async (req, res) => {
    let username_query = req.params.usernameInput; 
    
    try{
      // find user in database 
      const response = await user.find({username: username_query});
      // send the data in the response
      res.status(200).json(response[0].friends)
    }
    catch(err){
      // if unable to retrieve the information
      // error 
    res.json(err)
    }
   
  })

// POST a new friend
app.post("/Friends/:usernameInput", async (req, res) => {
  let username_query = req.params.usernameInput; 
  try{
    // find user and update friends list with this added user 
    await user.findOneAndUpdate({username: username_query}, {
      $push: {
        friends: req.body.friendAdded
      }
    })
    const data = {
      status: "posted", 
      friendAdded: req.body.friendAdded
    }
    res.status(200).json(data)
  }
  catch(err){
    // if unable to retrieve the information
    res.status(400).json(err)
  }
})

app.delete("/Friends/:usernameInput/:friendInput", async (req, res) => {
  let username_query = req.params.usernameInput; 
  let friend_query = req.params.friendInput
  try{
    // find user and update friends list with this added user 
    await user.findOneAndUpdate({username: username_query}, {
      $pull: {
        friends: friend_query
      }
    })
    const data = {
      status: "deleted", 
      friendDeleted: friend_query
    }
    res.status(200).json(data)
  }
  catch(err){
    // if unable to retrieve the information
    res.json(err)
  }
  // send info to database once we make database connection 
  //res.status(200).json(data)
})

app.get("/CurrentGroup/:usernameInput", async (req, res) => {
  let username_query = req.params.usernameInput; 
  try{
    // find user in database 
    const response = await user.find({username: username_query});
    // send the current group data in the response
    res.json(response[0].currentGroup)
  }
  catch(err){
    // if unable to retrieve the information
    res.json(err)
  }
 
})

app.post("/AddToGroup/:usernameInput", async (req, res) => {
  try{
    // if: the friend or groupName passed through is not in the users friend list --> error 
   //  const response = await user.find({username: username_query})
          // go to tutor for this. 
    // otherwise: 
    // find group and update current members list with this added user 
    await group.findOneAndUpdate({name: req.body.groupName}, {
      $push: {
        members: req.body.friend
      }
    })
    // find friend user and set current group this group 
    await user.findOneAndUpdate({username: req.body.friend}, {
      $set: {
        currentGroup: req.body.groupName
      }, 
      $push:{
        allGroups: req.body.groupName
      }
    })
    const data = {
      status: "posted", 
      friend: req.body.friend,
      groupName: req.body.groupName
    }
    res.status(200).json(data)

  }
  catch(err){
    // if unable to retrieve the information
    res.json(err)
  }
  // send info to database once we make database connection
})

// GET all transactions for any group
// send back json of the group, then front end retracts the list of transactions
app.get("/Transactions/:groupInput", async (req, res) => {
  // aquire from database (for now we are calling mockaroo)
  let group_query = req.params.groupInput; 
  try{
    // find user in database 
    const response = await group.find({name: group_query});
    // send the data in the response
    res.json(response[0].transactions)
    console.log(response)
  }
  catch(err){
    // if unable to retrieve the information
    res.json(err)
  }
})

// POST new transaction (when user clicks add expense)
// Add this transaction to the groups list of transactions
app.post("/Transactions/:groupInput", async (req, res) => {
let group_query = req.params.groupInput;
await group.findOneAndUpdate({name: group_query}, {
  $push: {
    transactions: [{
      charger: req.body.charger,
      chargee: req.body.chargee,
      amount: req.body.amount, 
      date: req.body.date, 
      description: req.body.description 
    }]
  }
})
const data = {
  status: "Posted", 
  date: req.body.date, 
  charger: req.body.charger,
  chargee: req.body.chargee,
  description: req.body.description, 
  amount: req.body.amount
}
// send information to database here 
res.json(data)
})

// GET all members of any group 
app.get("/Members/:groupInput", async (req, res) => {
let group_query = req.params.groupInput; 
  try{
    // find user in database 
    const response = await group.find({name: group_query});
    // send the data in the response
    res.json(response[0].members)
  }
  catch(err){
    // if unable to retrieve the information
    res.json(err)
  }
})

// GET all Groups for a sepcific user
app.get("/AllGroups/:usernameInput", async (req, res) => {
  let username_query = req.params.usernameInput; 
  
  try{
    // find user in database 
    const response = await user.find({username: username_query});
    // send the data in the response
    res.json(response[0].allGroups)
  }
  catch(err){
    // if unable to retrieve the information
    res.json(err)
  }
 
})

//GET a Group
app.get("/CreateGroup/:groupnameInput", async (req, res,next) => {
  // aquire Friends from database (for now we are calling mockaroo which gives us a random JSON array of friends) 
 // axios
  //.get("https://my.api.mockaroo.com/test.json?key=34e7d950")
  //.then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
  //.catch(err => next(err)) // pass any errors to express
  let groupname_query = req.params.groupnameInput;
  try{
    
    const response = await user.find({groupname: groupname_query});
    res.json(response[0].CreateGroup)
  }
  catch(err){
   
    res.json(err)
  }
})

app.post("/CreateGroup", async (req, res)=>{
  /*const data = {
    status: "Posted", 
    groupName: req.body.groupName
  }
  res.json(data)
  console.log("Create Group got called")
  console.log(req.body.groupName) */
  console.log("Create Group got called")
 
  console.log(req.query.groupName)
  let groupname_query = req.query.groupName;
  try{
    
    //await user.query("Insert into user(groupName, FriendName)")
    // find user and update group list with this added user 
    const newGroup = {
      name:  req.query.groupName, 
      date: Date.now(),
      members: [req.query.friendAdded],
      transactions:  [],
    }
    new group(newGroup).save()
    /*await group.findOneAndUpdate({groupname: groupname_query}, {
      $push: newGroup
       
    })*/
    const data = {
      status: "posted", 
      groupName: req.query.groupName,
      friendName: req.query.friendAdded
    }
    res.status(200).json(data)
  }
  catch(err){
    console.log(err)
    // if unable to retrieve the information
    res.json(err)
  }

})

// GET current group members
app.get("/CurrentGroupMembers/:user", async (req, res, next) => {
  let user_query = req.params.user; 
  console.log(user_query);
  try{
    // find user in database 
    const response = await user.find({username: user_query});
    // send the data in the response
    const response2 = await group.find({name: response[0].currentGroup});
    res.json(response2[0].members);

  }
  catch(err){
    // if unable to retrieve the information
    res.json(err)
  }
   })

app.get("/CurrentGroupMembers", (req, res, next) => {
    // aquire Friends from database (for now we are calling mockaroo)
    axios
    .get("https://api.mockaroo.com/api/7f5697d0?count=10&key=1d7007e0")
    // @TODO change the .chargee below when working on database 
    .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
    
  })

// sends a response for cookies including the Set-Cookie header
app.get("/set-cookie", (req, res) => {
  res
    .cookie("foo", "bar")
    .send({
      success: true,
      message: "Sent a cookie to the browser... let's hope it's saved.",
    })
})

// route that looks for Cookie header in the request and sends it back whatever data was found in it
app.get("/get-cookie", (req, res) => {
  const numCookies = Object.keys(req.cookies).length

  console.log(`Incoming cookie data: ${JSON.stringify(req.cookies, null, 0)}`)
  res.send({
    success: numCookies ? true : false,
    message: numCookies
      ? "thanks for sending cookies to the server"
      : "no cookies sent to the server",
      cookieData: req.cookies,
  })
})

//route that is protected.. only authenticated users can access it
app.get(
  "/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      user: {
        //id: req.user.id,
        username: req.user.username,

      },
      message: `Congratulations you have has accessed this route.`,
    })
  }
)

app.post("/login", async (req, res) => {
  let username_query = req.body.username; 
  console.log(username_query);

  const username = req.body.username
  const password = req.body.password

  if (!username || !password){
    res
      .status(401)
      .json({success: false, message: "no username or password supplied."})
      console.log("error1")
  }

  
    // find user in database 
  const response = user.find({username : username_query}).then((found_user) => { //found_user.username
    console.log(found_user[0].password);
    console.log(req.body.password);
    if (req.body.password == found_user[0].password){
      console.log("passwords match")
      const payload = { id: found_user.id}
      const token = jwt.sign(payload, jwtOptions.secretOrKey)
      res.json({ success: true, username: found_user[0].username, token: token})
      console.log("error3")
    }else{
      res.status(401).json({ success: false, message: "passwords did not match."})
      console.log("error4")
    }


  }).catch((err) => {
    res
    .status(401)
    .json({ success: false, message: `user not found: ${req.body.username}`})
    console.log(err)
  });
  //console.log(response);

})

// export the express app we created to make it available to other modules
module.exports = app
