const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./utils/ResponseHandle");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const corsConfig = {
  // credentials: true,
  // origin: [process.env.URL_REACT, "http://localhost:3002"],
};

let app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, content-type",
//     "x-access-token",
//     "Authorization"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // set cookie
//   res.setHeader("Set-Cookie", "visited=true; Max-Age=3000; HttpOnly, Secure");

//   // Pass to next layer of middleware
//   next();
// });

app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/v1/api", routes);

app.use((err, req, res, next) => {
  console.log("___________err", err);
  errorHandler(res, err);
});

connectDB();
let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("Server connection: OK, port: " + port);
  console.log("============================================================");
});
