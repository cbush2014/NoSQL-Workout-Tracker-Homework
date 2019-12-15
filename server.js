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

  app.put("/exercises/:id", (req, res) => {
    db.Workouts.updateOne({_id: req.params.id}, {rating: req.body.rating})
    .then( dbExercise => {
      res.json(dbExercise);
      });  
    });

  app.post("/submit", ({body}, res) => {
    console.log(body);
    db.Exercises.create(body)
      .then(({_id}) => db.Workouts.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
      .then(dbWorkouts  => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/exercises", (req, res) => {
    db.Exercises.find({})
      .then(dbExercises => {
        res.json(dbExercises);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/workouts", (req, res) => {
    db.Workouts.find({})
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/populated", (req, res) => {
    db.Workouts.find({})
      .populate("{me: one}, {")
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });


  
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });