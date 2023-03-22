const postSchema = [{
    name: "title",
    type: "text",
    input_id: "title",
}, {
    name: "description",
    type: "text",
    input_id: "post-description"
}, {
    name: "keywords",
    type: "text",
    input_id: "post-keywords"
}, {
    name: "postDate",
    type: "date",
    input_id: "post-date"
}, {
    name: "Post Image",
    type: "upload-image",
    input_id: "post-image"
}, {
    name: "Post author",
    type: "text",
    input_id: "post-author"
}, {
    id: "post-data-block-item",
    name: "postData",
    type: "blocks",
    data: []
}]

module.exports = { postSchema }