const express = require("express");
const router = express.Router();
const ejs = require("ejs")
const variables = require('../variables')
const bodyParser = require("body-parser")
// const pageCollection = require('../collections/page_collection')
const collectionModel = require('../models/collections.models')

const multer = require('multer');

const app = express()
app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});


router
    .post('/:collection', upload.array('upload-file'), async (req, res) => {
        const collectionName = req.params.collection
        var Collection;
        var collectionNameShort = collectionName.split('-edit-')

        if (variables.allowedIn == true) {
            for (let i = 0; i < variables.collectionList.length; i++) {
                if (variables.collectionList[i].name == collectionNameShort[0]) {
                    // console.log("found index", variables.collectionList[i])
                    Collection = variables.collectionList[i].model
                }
            }

            // console.log("save", collectionName, JSON.parse(req.body.documentData))
            var documentData = JSON.parse(req.body.documentData)

            await Collection.findOne({ slug: collectionNameShort[1] }).then((data) => {
                // console.log("Collection data", data)
                data.name = documentData.name;
                data.data = documentData.data;
                data.save().then(() => {
                    console.log("saved data!!")
                    res.redirect('/admin')
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })

            // var newCollectionDocument = new Collection(documentData)
            // await newCollectionDocument.save().then(() => {
            //     console.log("updated collection document")
            //     res.redirect('/admin')
            // }).catch((err) => {
            //     console.log(err)
            // })

        } else {
            console.log('you arent allowed in')
            res.redirect('/login')
        }

    })

module.exports = router;