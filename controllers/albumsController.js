const db = require('../models')
const bodyParser = require('body-parser')

function index (req, res) {
  db.Album.find({}, function (err, albums) {
    if (err) return res.status(500).json(err)
    res.json(albums)
  })
}

function create (req, res) {
  const newAlbum = req.body
  db.Album.create(newAlbum, function (err, album) {
    if (err) return res.status(500).json(err)
    res.json(album)
  })
}

function show (req, res) {
  // find one album by id and send it back as JSON
  db.Album.findById(req.params.albumId, function (err, foundAlbum) {
    if (err) { console.log('albumsController.show error', err) }
    res.json(foundAlbum)
  })
}

function showSong (req, res) {
  db.Song.find({}, function (err, song) {
    if (err) return res.status(500).json(err)
    res.json(song)
  })
}

// DELETE /api/albums/:albumId
function destroy (req, res) {
  // find one album by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/albums/:albumId
function update (req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
}

module.exports = {
  index: index,
  create: create,
  show: show,
  showSong: showSong
//  destroy: destroy,
//  update: update
}
