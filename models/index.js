let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/tunely')

let Album = require('./album.js')

module.exports = {
  Album: Album
}
