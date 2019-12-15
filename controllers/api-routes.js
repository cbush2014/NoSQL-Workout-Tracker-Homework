app.get("/all", (req, res) => {
    db.workouts.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    });
  });
  
  app.get("/find/:id", (req, res) => {
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
  
  app.post("/update/:id", (req, res) => {
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
  
  app.delete("/delete/:id", (req, res) => {
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
  
  app.delete("/clearall", (req, res) => {
    db.workouts.remove({}, (error, response) => {
      if (error) {
        res.send(error);
      } else {
        res.send(response);
      }
    });
  });
  