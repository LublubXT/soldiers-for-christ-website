const express = require("express");
const router = express.Router();
const ejs = require("ejs")
const variables = require('../variables')
const bodyParser = require("body-parser")
const pageCollection = require('../collections/page_collection')
const collectionModel = require('../models/collections.models')

const app = express()
app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'))

router
    .get('/:collection', async (req, res) => {
        const collectionName = req.params.collection
        var Collection;

        if (variables.allowedIn == true) {

            for (let i = 0; i < variables.collectionList.length; i++) {
                if (variables.collectionList[i].name == collectionName) {
                    // console.log("found index", variables.collectionList[i])
                    Collection = variables.collectionList[i].model
                }
            }
            // collectionModel.Collection.findOne({ name: collectionName }).then((collectiondata) => {
            //     // console.log(collectiondata)
            // console.log("Collection", Collection)
            Collection.find({}).then((data) => {
                // console.log("this is the page data", data)
                res.render('admin/collection', { collectionName: collectionName, collectionData: data, collections: variables.createCollectionList })
            }).catch((err) => {
                console.log(err)
            })


            // }).catch((err) => {
            //     console.log(err)
            // })

        } else {
            console.log('you arent allowed in')
            res.redirect('/login')
        }

    })

module.exports = router;