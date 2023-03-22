const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('./models/users.models')
const variables = require('./variables')
const mongoose = require('mongoose')
const navigation = require('./navigation')

// mongoose.connect('mongodb://localhost/headless-cms')

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const admin = require('./routes/admin')
app.use('/admin', admin)

const blogPosts = require('./routes/website/blog')
app.use('/post', blogPosts)

const lessons = require('./routes/website/lesson')
app.use('/lesson', lessons)

const resources = require('./routes/website/resources')
app.use('/resource', resources)

var headerImage = ''

variables.collectionList[0].model.findOne({ name: 'Home' }).then((data) => {
    // console.log(data)
    headerImage = data.data[4].data
}).catch((err) => {
    console.log(err)
})

// Navigation Goes Here -----
app.get('/', function (req, res) {
    var collection = variables.collectionList[0].model

    collection.findOne({ name: 'Home' }).then((data) => {
        // console.log(data)
        res.render('website/index', { pageData: data.data });
    }).catch((err) => {
        console.log(err)
    })
});

app.get('/blog', function (req, res) {
    var collection = variables.collectionList[1].model

    collection.find({}).then((data) => {
        // console.log(data)
        res.render('website/blog', { pageData: data, headerImage: headerImage });
    }).catch((err) => {
        console.log(err)
    })
});

app.get('/lessons', function (req, res) {
    var collection = variables.collectionList[3].model

    collection.find({}).then((data) => {
        // console.log(data[0].data)
        res.render('website/lesson-list', { pageData: data.reverse(), headerImage: headerImage });
    }).catch((err) => {
        console.log(err)
    })
});

app.get('/resources', function (req, res) {
    var collection = variables.collectionList[2].model

    collection.find({}).then((data) => {
        // console.log(data[0].data)
        res.render('website/resource-list', { pageData: data.reverse(), headerImage: headerImage });
    }).catch((err) => {
        console.log(err)
    })
});

// -------

app.get('/login', function (req, res) {
    res.render('admin/login');
});

app.post('/login', (req, res) => {
    if (variables.createNewUser == false) {
        userModel.User.findOne({ email: req.body.email, password: req.body.password }).then((data) => {
            // console.log(data)
            if (data.email == req.body.email && data.password == req.body.password) {
                variables.allowedIn = true
                console.log('directing to admin')
                res.redirect('/admin')
            } else {
                console.log('Not right username and password')
            }
        }).catch((err) => {
            console.log(err)
        })
    } else if (variables.createNewUser == true) {
        const newUser = new userModel.User({
            email: req.body.email,
            password: req.body.password
        })

        newUser.save().then(() => {
            console.log("Created new User")
        }).catch((err) => {
            console.log(err)
        })

    }
})

app.listen(3000, function () {
    console.log('Server started on port 3000.');
});