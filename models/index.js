let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/tunely')

let Album = require('./album.js')
let Song = require('./song.js')

module.exports.Album = Album
module.exports.Song = Song
