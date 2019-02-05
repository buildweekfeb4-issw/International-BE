const axios = require("axios");
const bcrypt = require("bcryptjs");
const userDb = require("../database/dbConfig.js");

const { authenticate, generateToken } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.post("api/students", students);
  // server.get('api/students', students)
  // server.get('api/students/id', students)
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

function students(req, res) {
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

  const studentsInfo = {
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
    .insert(studentsInfo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}
