const axios = require("axios");
const bcrypt = require("bcryptjs");
const userDb = require("../database/dbConfig.js");

const { generateToken } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.post("/api/student", student);
  server.get("/api/students", students);
  server.get("/api/students/id", studentid);
};

function register(req, res) {
  // implement user registration
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 14);

  const userInfo = {
    username,
    password: hash
  };

  userDb("users")
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}

function login(req, res) {
  const { username, password } = req.body;

  userDb("users")
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `welcome ${user.username}`, token });
      } else {
        res.status(401).json({ you: "shall not pass!!" });
      }
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}

function student(req, res) {
  // implement student registration
  const {
    name,
    status,
    age,
    insuranceCardexpires,
    birthcertificate,
    specialneeds,
    represenative,
    contactinfo
  } = req.body;

  const studentInfo = {
    name,
    status,
    age,
    insuranceCardexpires,
    birthcertificate,
    specialneeds,
    represenative,
    contactinfo
  };

  userDb("students")
    .insert(studentInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}
// get students list
function students(req, res) {
  userDb("students")
    .then(name => {
      res.status(200).json(name);
    })
    .catch(err => res.status(500).json(err));
}

// get student
function studentid(req, res) {
  userDb("students")
    .then(id => {
      res.status(200).json(id);
    })
    .catch(err => res.status(500).json(err));
}
