const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var userRoutes = require('./routes/user.routes');



const port = 3000

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  })
app.use(express.static('public'));
app.use('/users',userRoutes);

app.listen(port, function(){
    console.log(port);
})