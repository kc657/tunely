let express = require('express')
let app = express()
let controllers = require('./controllers')
let db = require('./models')
let bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api', controllers.api.index)

app.get('/api/albums', controllers.albums.index)

app.get('/api/albums/:albumId', controllers.albums.show)

app.get('/api/albums/:albumId/songs', controllers.songs.showSong)

app.post('/api/albums', controllers.albums.create)

app.post('/api/albums/:albumId/songs', controllers.songs.create)

app.listen(process.env.PORT || 3000)
