const express = require("express");
const router = express.Router();
const variables = require('../../variables')
const bodyParser = require("body-parser")

const app = express()
app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'))

var headerImage = ''

variables.collectionList[0].model.findOne({ name: 'Home' }).then((data) => {
    console.log(data)
    headerImage = data.data[4].data
}).catch((err) => {
    console.log(err)
})


router
    .get('/:slug', async(req, res) => {
        var slugUrl = req.params.slug

        var collection = variables.collectionList[3].model

        collection.findOne({ slug: slugUrl }).then((data) => {
            console.log("lessondat", data)

            res.render('website/lesson', { pageData: data, headerImage: headerImage, pageDataJson: JSON.stringify(data).replaceAll("'", "\\'") })
        }).catch((err) => {
            console.log(err)
        })
    })

module.exports = router;