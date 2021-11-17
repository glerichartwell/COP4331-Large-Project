// db.js

// import mongo
const MongoClient = require("mongodb").MongoClient;
// get connection string
const url = "mongodb+srv://delroy:mernstack@cluster0.gwikm.mongodb.net/Project_Data?retryWrites=true&w=majority"; //process.env.DB;
// create and connect client
const client = new MongoClient(url);
client.connect();
// export DB
module.exports = client;
