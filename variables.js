const mongoose = require('mongoose')
const textBlock = require('./blocks/text_input_block')
const dividerBlock = require('./blocks/divider_block')
const uploadBlock = require('./blocks/upload_block')
const setup = require('./setup')

mongoose.connect(setup.mongodbLink)

const createNewUser = false
var allowedIn = false

const blockList = [
    textBlock.paragraphInputBlock,
    textBlock.headingOneInputBlock,
    textBlock.headingTwoInputBlock,
    textBlock.headingThreeInputBlock,
    textBlock.headingFourInputBlock,
    dividerBlock.dividerBlock,
    dividerBlock.dividerTextBlock,
    uploadBlock.audioUploadBlock,
    uploadBlock.fileUploadBlock,
    uploadBlock.imageUploadBlock,
    uploadBlock.videoUploadBlock
]

var createCollectionList = []

for (collection in setup.collectionList) {
    var collectionName = setup.collectionList[collection].name
    createCollectionList.push(setup.collectionList[collection].name)
}

collectionList = setup.collectionList

// console.log("collection", createCollectionList)

module.exports = { createNewUser, allowedIn, collectionList, createCollectionList, blockList }