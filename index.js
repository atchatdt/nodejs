require('dotenv').config();
console.log(process.env.SESSION_SECRET);
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var userRoutes = require('./routes/user.routes');
var cookieParser = require('cookie-parser');
var auth = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middlewares');


const port = 3000

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
  })
app.use(express.static('public'));
app.use('/users',authMiddleware.requireAuth,userRoutes);
app.use('/auth',auth);
app.listen(port, function(){
    console.log(port);
})