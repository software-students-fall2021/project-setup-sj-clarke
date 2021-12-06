const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

// const db = process.env.REACT_APP_DB; // DB link
const db = 'mongodb+srv://tripsplit:tripsplit123@tripsplit.5k1jw.mongodb.net/TripSplit?retryWrites=true&w=majority'; 
// add models in a file 
function connect(){
    return new Promise((resolve, reject) =>{
        if (process.env.NODE_ENV == 'test'){
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose); 
            
            mockgoose.prepareStorage()
            .then(() => {
                console.log("Connected to mock DB"); 
                mongoose.connect(db)
                resolve()
                .then((res, err) => {
    
                    if (err) return reject(err); 
                    resolve(); 
                }

            )
        })
    }
        else {
            mongoose.connect(db)
            .then((res, err) =>{
                if (err) return reject(err); 
                resolve(); 
            })
        }

})
}


function close(){
    console.log("disconnected"); 
    return mongoose.disconnect(); 

}

module.exports = {connect, close}; 
