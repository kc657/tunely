let express = require('express'),
  app = express();
let controllers = require('./controllers')
let db = require('./models');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function homepage(req,res){
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api', controllers.api.index)

app.get('/api/albums', controllers.albums.index)

app.post('/api/albums', controllers.albums.create)

app.post('/api/albums/:album_id/songs', controllers.songs.create)

app.listen(process.env.PORT || 3000);
