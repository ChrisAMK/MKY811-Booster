const express = require("express");
const path = require("path");

const session = require("express-session");
// Requiring passport as we've configured it

const db = require("./models");

const PORT = process.env.PORT || 3001;
const server = express();

server.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

// Define middleware here
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  server.use(express.static("client/build"));
}

// defining external server routes
require("./routes/html-routes.js")(server);
require("./routes/api-routes.js")(server);


server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
