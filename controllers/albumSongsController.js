const db = require('../models')
const bodyParser = require('body-parser')

function create (req, res) {
  let album_id = req.params.album_id
  db.Album.findById(album_id, function (err, album){
    if (err) return res.status(500).json(err)
    if (album === null) return res.status(404).json({message: "didn't find album"})
    console.log("album found");
  })
  let newSong = req.body
  db.Album.create(newSong, function (err, song) {
    if (err) return res.status(500).json(err)
    res.json(song)
  })
}

module.exports = {
  create: create
}
