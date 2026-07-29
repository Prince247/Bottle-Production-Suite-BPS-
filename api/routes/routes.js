const express = require("express");
const route = express.Router();
const allController = require("../index");
const auth = require("../middlewares/auth");

const users = allController.users
route.post("/signup",users.createUser);
route.post("/login",users.getUser);
route.post("/refresh-token",users.refreshJwtToken);

module.exports = route;