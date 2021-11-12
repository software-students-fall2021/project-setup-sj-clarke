// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const axios = require('axios')
// connection to mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tripsplit:tripsplit123@tripsplit.5k1jw.mongodb.net/TripSplit?retryWrites=true&w=majority'); 
const { Schema } = mongoose;

// initializing User schema 
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
        chargee: String, 
        amount: String, 
        date: Date
      }
  ],
});
// initializing mongoose models 
const user = mongoose.model('user', user_schema)
const group = mongoose.model('group', group_schema)
// example posting a user


const user_practice = new user({username: 'GalBenShushan', 
    password: '1234',
    fName:   "Gal",
    lName: "Ben-Shushan",
    currentGroup: "Paris",
    allGroups: ["Paris"],
    friends: ["sjclarke", "DanielleZhao", "ElizabethJiranek", "EmilyHerschmann"] 

  })
// example posting a group 
  const group_practice = new group({
    name:  "Mexico", 
    date: "2021",
    members: ["sjclarke", "clarkeAndrew"], 
    transactions:  [ 
      {
          charger: "sjclarke", 
          chargee: "clarkeAndrew", 
          amount: "500", 
          date: "12/20/2021"
        }
    ],
  }
  )
  const group_practice_2 = new group({
    name:  "Mexico", 
    date: "2021",
    members: ["EmilyHerschmann", "ElizabethJiranek", "DanielleZhao", "GalBenShushan", "sjclarke"], 
    transactions:  [ 
      {
          charger: "EmilyHerschmann", 
          chargee: "ElizabethJiranek", 
          amount: "200", 
          date: "12/11/2021"
        }, 
        {
          charger: "GalBenShushan", 
          chargee: "sjclarke", 
          amount: "50", 
          date: "12/11/2021"
        }, 
        {
          charger: "GalBenShushan", 
          chargee: "EmilyHerschmann", 
          amount: "50", 
          date: "12/11/2021"
        }, 
        {
          charger: "DanielleZhao", 
          chargee: "GalBenShushan", 
          amount: "40", 
          date: "12/10/2021"
        }
    ]
  }
  )

  // user_practice.save().then(() => console.log("POSTED USER")); 

  group_practice_2.save().then(() => console.log("POSTED GROUP")); 

// get all users from DB
  async function getAllUsers(){
    const data = await user.find({});
      console.log(data)
  }
  // query group for specific user  
  
getAllUsers(); 

// async function getGroupBydate(){
//   const all = await group.find({date: "2019"});
//   console.log(all)
// }
// getGroupBydate(); 

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

user_schema.query.byName = function(username) {
  return this.where({ username: username})
};

// GET all Friends of a specific user 
// for now just choosing 1 user 
app.get("/Friends/:usernameInput", async (req, res) => {
    // aquire Friends from database (for now we are calling mockaroo which gives us a random JSON array of friends) 
    // axios
    // .get("https://my.api.mockaroo.com/friends.json?key=bd7c3ef0")
    // .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
    // .catch(err => next(err)) // pass any errors to express
    // Getting all friends for a user from database 
    let username_query = req.params.usernameInput; 
    
    try{
      // find user in database 
      const response = await user.find({username: username_query});
      // send the data in the response
      res.json(response)
    }
    catch(err){
      // if unable to retrieve the information
      res.json(err)
    }
   
  })

// POST a new friend
// Add it to the list of friends for the specific user that is currently logged in
// data coming through will be friend added (for the user)
// add that friend to the user we are on friend list 
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
    res.json(err)
  }
  // send info to database once we make database connection 
  //res.status(200).json(data)
})

// send back a Json with the group and the friend you are adding to it. 
app.post("/AddToGroup/:usernameInput", async (req, res) => {
  let username_query = req.params.usernameInput;  
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

// GET all Groups
app.get("/AllGroups", (req, res,next) => {
  // aquire All Groups from database (for now we are calling mockaroo which gives us a random JSON array of friends) 
  axios
  .get("https://my.api.mockaroo.com/groups.json?key=bd7c3ef0")
  .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
  .catch(err => next(err)) // pass any errors to express
})

//GET a Group
app.get("/CreateGroup", (req, res,next) => {
  // aquire Friends from database (for now we are calling mockaroo which gives us a random JSON array of friends) 
  axios
  .get("https://my.api.mockaroo.com/test.json?key=34e7d950")
  .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
  .catch(err => next(err)) // pass any errors to express
})

app.post("/CreateGroup", (req, res)=>{
  const data = {
    status: "Posted", 
    groupName: req.body.groupName
  }
  res.json(data)
  console.log("Create Group got called")
  console.log(req.body.groupName)
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

      console.log(response)
      res.json(response)
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
      }]
    }
  })
  const data = {
    status: "Posted", 
    date: req.body.date, 
    charger: req.body.charger,
    chargee: req.body.chargee,
    amount: req.body.amount

  }
  // send information to database here 
  res.status(200).json(data)
})
    // GET all members of any group 
app.get("/Members", (req, res, next) => {
  // aquire Friends from database (for now we are calling mockaroo)
  axios
  .get("https://my.api.mockaroo.com/members.json?key=bd7c3ef0")
  .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
  .catch(err => next(err)) // pass any errors to express
  
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

  // GET User
// route for HTTP GET requests to /json-example
app.get("/Users", (req, res,next) => {
  // aquire Users from database (for now we are calling mockaroo which gives us a random JSON array of users) 
  axios
  .get("https://my.api.mockaroo.com/Users.json?key=aa763330")
  .then(apiResponse => res.status(200).json(apiResponse.data)) // pass data along directly to client
  .catch(err => next(err)) // pass any errors to express
})

// POST a new User
// data coming through will be the user
// add the User
app.post("/Users", (req, res) => {
const data = {
  status: "Posted", 
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  password: req.body.password,
  username: req.body.username
}
// send info to database once we make database connection 
res.status(200).json(data)
})



// we will put some server logic here later...
// export the express app we created to make it available to other modules
module.exports = app
