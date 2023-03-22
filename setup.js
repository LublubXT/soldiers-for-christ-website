const mongoose = require('mongoose')
const collectionSchema = require('./models/collections.models')
const pageSchema = require('./collections/page_collection')
const postSchema = require('./collections/post_collection')
const resourceSchema = require('./collections/resource_collection')
const lessonSchema = require('./collections/lesson_collection')

var page = mongoose.model('page', collectionSchema.collectionSchema)
var post = mongoose.model('post', collectionSchema.collectionSchema)
var resource = mongoose.model('resource', collectionSchema.collectionSchema)
var lesson = mongoose.model('lesson', collectionSchema.collectionSchema)

const mongodbLink = 'mongodb+srv://soldiers:soldiers@cluster0.o9qnj6m.mongodb.net/?retryWrites=true&w=majority'

const collectionList = [
    { name: "page", schema: pageSchema.pageSchema, model: page },
    { name: "post", schema: postSchema.postSchema, model: post },
    { name: "resource", schema: resourceSchema.resourceSchema, model: resource },
    { name: "lesson", schema: lessonSchema.lessonSchema, model: lesson },
]

module.exports = { collectionList, page, post, resource, mongodbLink }