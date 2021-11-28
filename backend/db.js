//db.js

// import mongo
const MongoClient = require("mongodb").MongoClient;
// get connection string
const url =process.env.DB;
// create and connect client
const client = new MongoClient(url);
client.connect();
// export DB
module.exports = client;
