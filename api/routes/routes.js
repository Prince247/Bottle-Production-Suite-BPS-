const express = require("express");
const route = express.Router();
const allController = require("../index");

const users = allController.users
route.post("/signup",users.createUser);
route.post("/login",users.getUser);

module.exports = route;