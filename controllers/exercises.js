const router = require("express").Router()
const db = require("../models");

  router.post("/submit", ({body}, res) => {
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
  
  router.get("/exercises", (req, res) => {
    db.Exercises.find({})
      .then(dbExercises => {
        res.json(dbExercises);
      })
      .catch(err => {
        res.json(err);
      });
  });
  

  router.put("/exercises/:id", (req, res) => {
    db.Workouts.updateOne({_id: req.params.id}, req.body)
    .then( dbExercise => {
      res.json(dbExercise);
      });  
    });

module.exports = router;