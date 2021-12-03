require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const passportJWT = require("passport-jwt")
const app = require("./app")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

// set up some JWT authentication options
const mongoose = require('mongoose')
const { Schema } = mongoose;
const db = process.env.REACT_APP_DB;
mongoose.connect(`${db}`);


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

const user = mongoose.model('user', user_schema)



let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt") // look for the Authorization request header
jwtOptions.secretOrKey = process.env.JWT_SECRET // an arbitrary string used during encryption - see the .env file
console.log(jwtOptions) // debug to make sure the secret from the .env file is loaded correctly
// passport can work with many authentication systems... here we are setting some middleware code for using JWT that we'll pass to passport to use

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("JWT payload received", jwt_payload) // debugging

  

  // user.findOne({_id: jwt_payload.id}, (err, user) => {
  //   if(!user || err){
  //     next(null, false)
  //   }else{
  //     next(null,user)
  //   }
  // })

  // load up some mock user data in an array... we only need this because we're mocking the data from a database
  



  // try to find a matching user in our "database"

 
  console.log("test");

  

  const response = user.find({id: jwt_payload.id});
  if (response) {
    // we found the user... keep going
    next(null, response)
  } else {
    // we didn't find the user... fail!
    next(null, false)
  }
  
})

module.exports = {
  jwtOptions,
  jwtStrategy,
}
