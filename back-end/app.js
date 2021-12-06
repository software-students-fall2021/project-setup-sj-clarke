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
const users = require("./controllers/users")
require('dotenv').config()

const db = process.env.REACT_APP_DB;
mongoose.connect(`${db}`);

const { Schema } = mongoose;
require("dotenv").config({ silent: true })

//required for authentication with JSON Web Tokens
const jwt = require("jsonwebtoken")
const passport = require("passport")
app.use(passport.initialize())

//use JWT strategy within passport for authentication and handling
const { jwtOptions, jwtStrategy } = require("./jwt-config.js") // import setup options for using JWT in passport
const { Timestamp } = require("bson")
passport.use(jwtStrategy)

// set up some middleware
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(cookieParser()) // useful middleware for dealing with cookies


// the following cors setup is important when working with cookies on your local machine
app.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true })) // allow incoming requests only from a "trusted" host


const user_schema = new mongoose.Schema ({
  username:  String, // String is shorthand for {type: String}
  password: String,
  fName:   String,
  lName: String,
  currentGroup: String,
  allGroups: [String],
  friends: [String]
  
});

const user = mongoose.model('user')


const group_schema = new Schema({
  name:  String, 
  date: Date,
  members: [String],
  transactions:  [ 
    {
        charger: String, 
        chargee: Object, 
        amount: String, 
        date: Date, 
        description: String
      }
  ],
});

const group = mongoose.model('group', group_schema)


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
  console.log(req.headers); 
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
      description: req.body.description,
      completed: req.body.completed 
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

app.post("/updateTransaction/:groupInput/:transactionID/:username", async (req,res) => {
  let group_query = req.params.groupInput;
  let transactionID = req.params.transactionID; 
  let username = req.params.username
  let temp = 
    {
      id: 0, 
      charger: '',
      chargee: {}, 
      amount: "", 
      date: Date, 
      description: "", 
      completed: 0
  }
  // update existing transaction for this group. 
  const currentGroup = await group.find({name: group_query})
  console.log(currentGroup)
  const trans = currentGroup[0].transactions
  console.log(trans)
  // add all transactions, only change the one 
  var final = []
  var index; 
  for (var i = 0; i < trans.length; i++){
    if ((trans[i]._id == transactionID)){
      console.log(transactionID)
      console.log(trans[i]._id)
      
      // copy the whole transaction into a new id
      temp._id = trans[i]._id
      trans[i].chargee[username] +=1; 
      temp.charger = trans[i].charger
      temp.chargee = trans[i].chargee
      temp.amount = trans[i].amount
      temp.date = trans[i].date
      temp.description = trans[i].description
      temp.completed = trans[i].completed
      index = i; 
      
      console.log(temp.chargee)
      // temp.chargee[username] = 1
      console.log(temp.chargee)
      final.push(temp)
    }
    else {
      final.push(trans[i])
    }

  }


  await group.findOneAndUpdate({name: group_query}, 
    { $set: {
        transactions: final
    }
      
     
  }


    )

  // temp.chargee[username] = 1
  // console.log(temp.chargee[username])
  // currentGroup[0].transactions = temp; 

  // console.log(currentGroup[0].transactions)
  // find one and update group, pass through transaction 
  // await group.findOneAndReplace({name: group_query}, {
  //   $push: {
  //     transactions: [temp]
  //   }
  // })
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
  console.log(username_query)
  try{
    // find user in database 
    const response = await user.find({username: username_query});
    // send the data in the response
    console.log(response[0])
    res.json(response[0].allGroups)
  }
  catch(err){
    // if unable to retrieve the information
    res.json(err)
  }
 
})

//GET a Group
app.get("/CreateGroup/:groupnameInput", async (req, res,next) => {
 
  let groupname_query = req.params.groupnameInput;
  try{
    
    const response = await user.find({groupname: groupname_query});
    res.json(response[0].CreateGroup)
  }
  catch(err){
   
    res.json(err)
  }
})


// test this
app.post("/CreateGroup/", async (req, res)=>{
  /*const data = {
    status: "Posted", 
    groupName: req.body.groupName
  }
  res.json(data)
  console.log("Create Group got called")
  console.log(req.body.groupName) */
  console.log("Create Group got called")
  console.log(req.body.groupName)
  let groupname_query = req.body.groupName;
  try{
    
    //await user.query("Insert into user(groupName, FriendName)")
    // find user and update group list with this added user 
    const newGroup = {
      name:  req.body.groupName, 
      date: Date.now(),
      members: [req.body.friendAdded, req.body.userInput],
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
    // set as the users current group and friend. 
    await user.findOneAndUpdate({username: req.query.userInput}, {
      $set: {
        currentGroup: req.query.groupName
      }, 
      $push:{
        allGroups: req.query.groupName
      }
    })
    await user.findOneAndUpdate({username: req.query.friendAdded}, {
      $set: {
        currentGroup: req.query.groupName
      }, 
      $push:{
        allGroups: req.query.groupName
      }
    })
  }
  catch(err){
    console.log(err)
    // if unable to retrieve the information
    res.json(err)
  }

})


app.delete('/Group/:groupInput', async (req,res) => {
  const group_query = req.params.groupInput
  try{
    // find user and update friends list with this added user 
    await group.deleteOne({name: group_query})
    const data = {
      status: "deleted", 
      groupDeleted: group_query
    }
    res.status(200).json(data)
  }
  catch(err){
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



// POST a new User
// data coming through will be the user
// add the User
app.post("/Users", (req, res) => {
const data = new user ({
  fName: req.body.fName,
  lName: req.body.lName,
  password: req.body.password,
  username: req.body.username, 
  currentGroup: req.body.currentGroup,
  allGroups: req.body.allGroups, 
  friends: req.body.friends
});
// send info to database once we make database connection 
data.save()
  .then((data) => res.status(200).json(data)); 
})

app.delete('/Users/:userInput', async (req,res) => {
  const username_query = req.params.userInput
  try{
    // find user and update friends list with this added user 
    await user.deleteOne({username: username_query})
    const data = {
      status: "deleted", 
      userDeleted: username_query
    }
    res.status(200).json(data)
  }
  catch(err){
    // if unable to retrieve the information
    res.json(err)
  }
  
})


app.get("/Users", async (req, res)  => {
  const response = await user.find();
  // send info to database once we make database connection 
  res.status(200).json(response); 
  })
  //})

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

app.get("/signup/:userInput", async (req, res, next) => {
  try{
    const response = await user.find({username: username_query});
    res.json(response[0].SignUp)
    console.log("hello")
  }
  catch(err){
    res.json(err)
  }
})

app.post("/signup/", async (req, res) => {
  console.log("signup has been called")
  console.log(req.query.username)
    try{
      const newUser = {
        username: req.query.username,
        password: req.query.password,
        fName: req.query.fName,
        lName: req.query.lName,
        currentGroup: "",
        allGroups: [],
        friends: [],

      }
      new user(newUser).save()

      const data = {
        status: "posted",
        username: req.query.username,
        password: req.query.password,
        fName: req.query.fName,
        lName: req.query.lName
      }
      res.status(200).json(data)

    }catch(err){
      if(err == 404){
        console.log("hello")
      }
      console.log(err)
      res.json(err)

    }

})





// export the express app we created to make it available to other modules
module.exports = app
