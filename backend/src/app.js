const express = require("express");
const path = require("path");
const DbConnection = require("./config/DbConnection");
const cookieParser = require("cookie-parser");
const env = require("dotenv");
const cors = require("cors");

const app = express();

env.config("../.env");

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-access-token",
    ],
    preflightContinue: false,
  })
);

app.use(express.static(path.join(__dirname, "../public")));

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use("/", require("./routes"));

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  DbConnection.authenticate().then(
    function () {
      console.log("DB connection has been established successfully.");
    },
    function (err) {
      console.log("Unable to connect to the database:", err);
    }
  );
  console.log(`Server running on port ${port}... `);
});

module.exports = app;
