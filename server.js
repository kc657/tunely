let express = require('express'),
  app = express();

let controllers = require('./controllers')

let db = require('./models');

app.use(express.static('public'));

app.get('/',function homepage(req,res){
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api', controllers.api.index)

app.listen(process.env.PORT || 3000);
