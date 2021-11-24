// server.js

// import middleware
const express = require("express");
const cors = require("cors");
require("dotenv").config();
var requestInformationAPI = require("./api/request-info.api");
// var compTodayAPI = require("./api/CompTodayAPI");
var addClient = require("./api/add-client.api");
var editClient = require("./api/edit-client.api");
var searchClient = require("./api/search-client.api");
var searchClientByEmail = require("./api/search-client-by-email.api");
var deleteClient = require("./api/delete-client.api");
var viewClients = require("./api/view-clients.api");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", requestInformationAPI);
// app.use("/", compTodayAPI);
app.use("/", addClient);
app.use("/", editClient);
app.use("/", searchClient);
app.use("/", searchClientByEmail);
app.use("/", deleteClient);
app.use("/", viewClients);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.listen(5000); // start Node + Express server on port 4000
