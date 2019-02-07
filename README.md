# International-BE

server.post("/api/register", register);
registers a user to the database

server.post("/api/login", login);
user logs in using username and password.
gives users a token to be able to see students.

server.post("/api/student", authenticate,student);
add student information
name
status
age
insuranceCardexpires
birthcertificate
specialneeds
represenative
contactinfo

server.get("/api/students", authenticate, students);
recieve list of students names

server.get("/api/students/:id", authenticate, studentid);
get individual info on a student includes status age etc.