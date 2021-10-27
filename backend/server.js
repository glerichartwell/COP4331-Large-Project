// server.js

// import middleware
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// import login api endpoint
var loginAPI = require("../API/LoginAPI");
// use login api endpoint (temp accessed at http://localhost:PORT/api/login)
app.use("/", loginAPI);
