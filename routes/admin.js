const express = require("express");
const router = express.Router();
const variables = require('../variables')
const bodyParser = require("body-parser")
const pageCollection = require('../collections/page_collection')
const collectionModel = require('../models/collections.models')

const app = express()
app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'))

router
    .get('/', async (req, res) => {
        if (variables.allowedIn == true) {
            for (let i = 0; i < variables.collectionList.length; i++) {
                var collectionName = variables.collectionList[i].name
                // console.log(collectionName);
                // console.log(variables.createCollectionList)
            }

            // collectionModel.Collection.find({}).then((data) => {
            // console.log("this is the page data", data)
            res.render('admin/home', { collections: variables.createCollectionList })
            // }).catch((err) => {
            //     console.log(err)
            // })

        } else {
            console.log('you arent allowed in')
            res.redirect('/login')
        }
    })

const collection = require("./collection")
router.use("/collection", collection)
const newCollection = require("./newcollectionitem")
router.use("/newcollection", newCollection)
const saveCollection = require("./savecollectionitem")
router.use("/savecollection", saveCollection)
const editCollection = require("./editcollectionitem")
router.use("/editcollection", editCollection)
const updateCollection = require("./updatecollectionitem")
router.use("/updatecollection", updateCollection)

module.exports = router;