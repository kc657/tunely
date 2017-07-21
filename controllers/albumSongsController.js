const db = require('../models')

function create (req, res) {
  let newSong = req.body
  db.Album.create(newSong, function (err, song){
    if (err) return res.status(500).json(err);
    res.json(song);
  })
}

module.exports = {
  create: create
}
