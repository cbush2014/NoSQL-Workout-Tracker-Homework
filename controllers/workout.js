const router = require("express").Router()


router.get("/all", (req, res) => {
    db.workouts.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    });
  });
  
  router.get("/find/:id", (req, res) => {
    db.workouts.findOne(
      {
        _id: mongoose.ObjectId(req.params.id)
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });
  
  router.post("/update/:id", (req, res) => {
    db.workouts.update(
      {
        _id: mongoose.ObjectId(req.params.id)
      },
      {
        $set: {
          title: req.body.title,
          note: req.body.note,
          modified: Date.now()
        }
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });
  
  router.delete("/delete/:id", (req, res) => {
    db.workouts.remove(
      {
        _id: mongoose.ObjectID(req.params.id)
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });
  
  router.delete("/clearall", (req, res) => {
    db.workouts.remove({}, (error, response) => {
      if (error) {
        res.send(error);
      } else {
        res.send(response);
      }
    });
  });

  
  router.get("/populated", (req, res) => {
    db.Workouts.find({})
      .populate("{me: one}, {")
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.get("/workouts", (req, res) => {
    db.Workouts.find({})
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
module.exports = router;