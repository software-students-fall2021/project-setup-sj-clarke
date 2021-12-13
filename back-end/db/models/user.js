<<<<<<< HEAD
const mongoose = require('mongoose');


const user_schema = new mongoose.Schema ({
    username:  String, // String is shorthand for {type: String}
    password: String,
    fName:   String,
    lName: String,
    currentGroup: String,
    allGroups: [String],
    friends: [String]
    
  });

  const user = mongoose.model('user', user_schema)

  module.exports = { user }; 
=======
// const mongoose = require('mongoose');


// const user_schema = new mongoose.Schema ({
//     username:  String, // String is shorthand for {type: String}
//     password: String,
//     fName:   String,
//     lName: String,
//     currentGroup: String,
//     allGroups: [String],
//     friends: [String]
    
//   });

//   const user = mongoose.model('user', user_schema)

//   module.exports = { user }; 
>>>>>>> bb48ae4dc61ba4bbd2c66e8784da42fae3b913c1
