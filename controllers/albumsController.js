const db = require('../models');

function index (req, res) {
  db.Album.find({}, function (err, albums) {
    if (err) return res.status(500).json(err);
    res.json(albums)
  })
}

module.exports = {
  index: index
//  ,
//  create: create,
//  show: show,
//  destroy: destroy,
//  update: update
}
