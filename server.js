let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
require('dotenv').config();

let dbConfig = require('./database/db');

// Express Route
const studentRoute = require('./routes/student.route')
const userRoute = require("./routes/user.route")

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
app.use(cors({
  origin:['https://student-list-fe.herokuapp.com','http://localhost:3000'],
  credentials:true,

}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
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