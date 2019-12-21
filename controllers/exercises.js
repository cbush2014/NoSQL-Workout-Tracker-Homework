const router = require("express").Router()
const db = require("../models");

  router.post("/submit", ({body}, res) => {
    console.log(body);
    db.Exercises.create(body)
      .then((newEx) => {
        console.log(newEx);
        return db.Workouts.findOneAndUpdate({}, { $push: { exercises: newEx._id } }, { new: true })
      })
      .then(dbWorkouts  => {
        res.json(newEx);
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

  // get route to find by id
  router.get("/exercises/:id"), (req, res) => {
    console.log('crb testing:  findById('+req.params.id+')');
  db.Exercises.findById(req.params.id)
  .then(result => {
    console.log('crb testing:  result:'+result);

      if(!result) {
          return res.status(404).send({
              message: "Exercise not found with id " + req.params.id
          });            
      }
      res.send(result);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Exercise not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving exercise with id " + req.params.id
      });
  });
};

module.exports = router;