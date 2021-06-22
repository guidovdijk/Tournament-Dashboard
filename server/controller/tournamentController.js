const Tournament = require("../model/tournament");

// Create and Save a new Tournaments
exports.create = (req, res) => {
  console.log(req.body);
  let tournament = new Tournament(req.body);
  tournament.save()
    .then(() => {
      return res.status(200).json({msg: 'tournament has been successfully added', id: tournament._id});
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).send("unable to save to database");
    });
};

// Retrieve all Tournamentss from the database.
exports.findAll = (req, res) => {
  Tournament.find(function(err, tournaments){
    if(err){
      res.json(err);
    }
    else {
      res.status(200).json({
        success: true,
        tournaments: tournaments,
      });
    }
  });
};

// Find a single Tournaments with an id
exports.findOne = (req, res) => {
  let id = req.params.id;
  Tournament.findOne({_id: id}, function (err, tournament){
    if (!tournament){
      return res.status(404).json({
        msg: "tournament is not found",
        success: false
      });
    }
    if(err) {
      res.json(err);
    } else {
      res.json(tournament);
    }
  }).populate('teams', null, null, { sort: { team_name: 1 } } );
};

// Update a Tournaments by the id in the request
exports.update = (req, res) => {
  Tournament.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      return res.status(201).json({
        msg: "tournament is updated",
        success: true
      });
    })
    .catch(err =>{
      res.json(err);
    })
};

// Delete a Tournaments with the specified id in the request
exports.delete = (req, res) => {
  Tournament.findByIdAndRemove({_id: req.params.id}, function(err){
    if(err) {
      res.json(err);
    }
    else {
      res.json('Tournament successfully removed');
    }
  });
};


// Delete all Tournamentss from the database.
exports.deleteAll = (req, res) => {
  res.status(501).send({
    message: "Delete all functionality not implemented"
  });
};