const express = require("express");
const router = express.Router();
const ejs = require("ejs")
const variables = require('../variables')
const bodyParser = require("body-parser")
    // const pageCollection = require('../collections/page_collection')
const collectionModel = require('../models/collections.models')

const app = express()
app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'))

router
    .get('/:collection', async(req, res) => {
        const collectionName = req.params.collection

        if (variables.allowedIn == true) {
            // collectionModel.Collection.findOne({ name: collectionName }).then((collectiondata) => {
            //     // console.log(collectiondata)
            //     collectionModel.Collection.find({}).then((data) => {
            //         // console.log("this is the page data", data)
            //         res.render('admin/collection', { collectionData: collectiondata, collections: data })
            //     }).catch((err) => {
            //         console.log(err)
            //     })


            // }).catch((err) => {
            //     console.log(err)
            // })

            var collectionSchemaData = variables.collectionList.find(({ name }) => name === collectionName)

            // console.log(`Collection name: ${collectionName}, Collection Item Name:`, collectionSchemaData)


            res.render('admin/newcollectionitem', { collectionName: collectionName, collections: variables.createCollectionList, collectionSchemaData: collectionSchemaData, collectionSchemaDataJson: JSON.stringify(collectionSchemaData), blockListJson: JSON.stringify(variables.blockList), collectionDataJson: JSON.stringify([]) })


        } else {
            console.log('you arent allowed in')
            res.redirect('/login')
        }

    })

module.exports = router;