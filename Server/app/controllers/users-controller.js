const db = require("../models");
const users = db.users;
const jwt = require('../services/auth-service');

// Get all users from the database.
const findAll = async (req, res) => {
  try {
    const usersData = await users.find();
    res.json(usersData);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving users." });
  }
};

// Login
const login = async (req, res) => { 
  try {
    const currentUser = await users.findOne({ username: req.body.username, password: req.body.password });
    if (currentUser != null) {
      const token = jwt.generateToken(currentUser);
      res.json(token);
    }
    else {
      return res.status(404).send({ message: "User Not found." });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving brands."
    });
  }
};


module.exports = {
  findAll,
  login
};
