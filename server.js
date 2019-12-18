const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout_trackerdb',
//  { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => handleError(error));

//or
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout_trackerdb',
 { useNewUrlParser: true, useUnifiedTopology: true });
 mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
      console.warn('Error', error);
  });

db.Workouts.create({name: "Get 'Er Done Workout Tracker"})
  .then(dbWorkouts => {
    console.log(dbWorkouts);
  })
  .catch( ({message}) => {
    console.log(message);
  });

  app.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, "./public/index.html"));
  })
  app.use(require("./controllers/exercises"));
  app.use(require("./controllers/workout"));
  
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });