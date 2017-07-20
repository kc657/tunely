let mongoose = require('mongoose')
let Schema = mongoose.Schema

let SongSchema = new Schema({
  name: String,
  trackNumber: Number
})

let Song = mongoose.model('Song', SongSchema)
module.exports = Song
