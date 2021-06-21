const Team = require("../model/team");

// Create and Save a new teams
exports.create = (req, res) => {
  let team = new Team(req.body);
  team.save()
    .then(() => {
      res.status(200).json({'team': 'team has been successfully added'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
};

// Create and Save a new teams
exports.createMany = (req, res) => {
  Team.insertMany(req.body)
    .then((data) => {
      console.log(data);
      res.status(200).json({msg: 'teams has been successfully added', success: true});
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({msg: "unable to save to database", success: false});
    });
};

// Retrieve all teams from the database.
exports.findAll = (req, res) => {
  Team.find(function(err, teams){
    if(err){
      res.json(err);
    }
    else {
      res.json(teams);
    }
  });
};

// Find a single teams with an id
exports.findOne = (req, res) => {
  let id = req.params.id;
  Team.findById(id, function (err, team){
      if(err) {
        res.json(err);
      }
      res.json(team);
  });
};

// Update a teams by the id in the request
exports.update = (req, res) => {
  Team.findById(req.params.id, function(err, team) {
    if (!team){
      res.status(404).send("team is not found");
    }
    else {
        team = req.body;

        team.save().then(() => {
          res.json('Updated team');
      })
      .catch(() => {
            res.status(400).send("unable to update the team");
      });
    }
  });
};

// Delete a teams with the specified id in the request
exports.delete = (req, res) => {
  Team.findByIdAndRemove({_id: req.params.id}, function(err){
    if(err) {
      res.json(err);
    }
    else {
      res.json('team successfully removed');
    }
  });
};


// Delete all teamss from the database.
exports.deleteAll = (req, res) => {
  res.status(501).send({
    message: "Delete all functionality not implemented"
  });
};