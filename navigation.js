const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');


// mongoose.connect('mongodb://localhost/headless-cms')

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('website/index');
});

module.exports = {}