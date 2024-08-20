const path = require("node:path");
const express = require("express");
const app = express();

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
const { setUpAuth } = require("./auth/auth");

require("dotenv").config();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(
   session({
      store: new pgSession({
         pool: pool,
         createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
   })
);

app.use(express.static(path.join(__dirnamedirname, "public")));
app.use(express.urlencoded({ extended: true }));
setUpAuth(app);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
