#!/usr/bin/env node
const app = require("./app");
const server = require("./app") // load up the web server
// call express's listen function to start listening to the port

db = require('./db/index.js'); 
const port = process.env.PORT || 5000 // the port to listen to for incoming requests


db.connect()
.then(() => {
  server.listen(port, () =>{
    console.log(`Server running on port: ${port}`)
  })
})
