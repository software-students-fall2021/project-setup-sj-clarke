
let chai =  require("chai")
let server = require("app.js")
// a set of tests of array functions
describe("Friends test", function () {
  
    // test GET all friends
    describe("GET /Friends", function(){
        it("Should get all friends" (done)=>
        {
            chai.request(server)
            .get("/Friends")
            .end((err, response) =>{
                response.should
            }
        })
    }


    // test POST 



  });