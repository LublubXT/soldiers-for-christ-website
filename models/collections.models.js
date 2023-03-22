const mongoose = require('mongoose')

const collectionSchema = {
    name: String,
    slug: String,
    data: []
}

// const Collection = mongoose.model('Collection', collectionSchema);

module.exports = { collectionSchema }