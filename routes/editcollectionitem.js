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
        var Collection;
        var collectionNameShort = collectionName.split('-edit-')

        if (variables.allowedIn == true) {

            for (let i = 0; i < variables.collectionList.length; i++) {
                if (variables.collectionList[i].name == collectionNameShort[0]) {
                    // console.log("found index", variables.collectionList[i])
                    Collection = variables.collectionList[i].model
                }
            }
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

            var collectionSchemaData = variables.collectionList.find(({ name }) => name === collectionNameShort[0])

            // console.log(`Collection name: ${collectionName}, Collection Item Name:`, collectionSchemaData)
            await Collection.findOne({ slug: collectionNameShort[1] }).then((data) => {
                // console.log("this is the page data", data, collectionNameShort[1])
                for (var i = 0; i < data.data.length; i++) {
                    if (Array.isArray(data.data[i].data) == false) {
                        data.data[i].data.replaceAll('\"', "\\\"")
                    } else if (Array.isArray(data.data[i].data == true)) {
                        for (var a = 0; a < data.data[i].length; a++) {
                            data.data[i].data[a].replaceAll('\"', "\\\"")
                        }
                    }
                }

                // console.log(data)
                // console.log(data.data[0].data[2].data.replaceAll('\"', "\\\""))
                res.render('admin/editcollectionitem', { collectionName: collectionName, collections: variables.createCollectionList, collectionSchemaData: collectionSchemaData, collectionSchemaDataJson: JSON.stringify(collectionSchemaData).replaceAll("'", "\\'"), collectionData: data, collectionDataJson: JSON.stringify(data).replaceAll('\\\"', "\\\\\"").replaceAll('\'', "\\'"), blockListJson: JSON.stringify(variables.blockList) })
            }).catch((err) => {
                console.log(err)
            })

        } else {
            console.log('you arent allowed in')
            res.redirect('/login')
        }

    })

module.exports = router;