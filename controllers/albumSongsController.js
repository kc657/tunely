const db = require('../models')
const bodyParser = require('body-parser')

function create (req, res) {
  const albumId = req.params.albumId
  db.Album.findById(albumId, function (err, album) {
    if (err) return res.status(500).json(err)
    if (album === null) return res.status(404).json({message: "didn't find the album."})
    db.Song.create({
      trackNumber: req.body.trackNumber,
      name: req.body.name
    }, function (err, song) {
      if (err) return res.status(500).json(err)
      album.songs.push(song)
      album.save()
      res.json(song)
    })
  })
};

function showSong (req, res) {
  const albumId = req.params.albumId
  db.Album.findById(albumId, function (err, album) {
    res.json(album)
  })
}

module.exports = {
  create: create,
  showSong: showSong
}
