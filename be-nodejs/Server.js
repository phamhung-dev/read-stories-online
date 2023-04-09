const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require("./routes/Api");
const view = require("./routes/View");
const db = require("./config/DbConfig");

const app = express();

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.on("error", err => {
  console.log("err", err);
});
db.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.use("/api", api);
app.use("/", view);

app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});