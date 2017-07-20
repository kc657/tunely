let mongoose = require('mongoose')
let Schema = mongoose.Schema
let Song = require('./song.js')

let AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [String],
  songs: [Song.schema]
})

let Album = mongoose.model('Album', AlbumSchema)
module.exports = Album
