let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

let dbConfig = require('./database/db');

// Express Route
const studentRoute = require('../backend/routes/student.route')
const userRoute = require("../backend/routes/user.route")

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database successfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST,DELETE,PUT,GET,OPTIONS");
  res.header("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
  res.header("Access-Control-Request-Method", req.headers['access-control-request-method']);
  next();
});
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());
app.use('/students', studentRoute)
app.use('/user',userRoute)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});