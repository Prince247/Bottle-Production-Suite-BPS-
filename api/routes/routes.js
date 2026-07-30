const express = require("express");
const route = express.Router();
const allController = require("../index");
const auth = require("../middlewares/auth");

const users = allController.users
route.post("/signup",users.createUser);
route.post("/login",users.getUser);
route.post("/refresh-token",users.refreshJwtToken);

const parties = allController.parties
route.get('/parties',parties.listParties);
route.get('/parties/:id',parties.getPartiesById);
route.post('/parties',parties.createParties);
route.put('/parties/:id',parties.updateParties);
route.delete('/parties/:id',parties.deleteParties);

module.exports = route;