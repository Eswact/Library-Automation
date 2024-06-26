const db = require("../models");
const users = db.users;
const jwt = require('../services/auth-service');
const nodemailer = require('nodemailer');

function generateRandomPassword(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log(password);
  return password;
}

async function sendPasswordEmail(email, password) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'renterensmurf@gmail.com',
      pass: 'utgwplwftqgzoejt'
    }
  });

  const mailOptions = {
    from: 'renterensmurf@gmail.com',
    to: email,
    subject: 'Hesabınız Oluşturuldu!',
    text: `Hesabınız oluşturuldu. Hesabınızın şifresi: ${password}`
  };

  await transporter.sendMail(mailOptions);
}

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

// Register (customer)
const register = async (req, res) => {
  const thisUser = await users.findOne({ 
    $or: [
      { username: req.body.username },
      { mail: req.body.mail }
    ]
  });
  if (thisUser != null) { return res.status(404).send({ message: "Username or e-mail is used." }); }
  try {
    const user = new users({
      username: req.body.username,
      password: req.body.password,
      role: 2,
      mail: req.body.mail
    });
    const data = await user.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while creating the User." });
  }
};

// Register (Admin)
const registerAdmin = async (req, res) => {
  const thisUser = await users.findOne({ 
    $or: [
      { username: req.body.username },
      { mail: req.body.mail }
    ]
  });
  console.log(thisUser);
  if (thisUser != null) { return res.status(404).send({ message: "Username or e-mail is used." }); }
  try {
    let newPassword = generateRandomPassword(6);
    sendPasswordEmail(req.body.mail, newPassword)
    const user = new users({
      username: req.body.username,
      password: newPassword,
      role: req.body.role,
      mail: req.body.mail
    });
    const data = await user.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while creating the User." });
  }
};

// Delete a user with the specified id in the request
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userDeleteResult = await users.deleteOne({ _id: id });
    if (userDeleteResult.deletedCount === 0) {
      res.status(404).send({ message: "Not found user with id " + id });
    } else {
      res.status(200).send({ message: "user deleted successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete user with id=" + id });
  }
};


module.exports = {
  findAll,
  login,
  register,
  registerAdmin,
  deleteUser
};
