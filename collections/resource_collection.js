const resourceSchema = [{
    name: "title",
    type: "text",
    input_id: "title"
}, {
    name: "subtext",
    type: "text",
    input_id: "subtext"
}, {
    name: "resource description",
    type: "text",
    input_id: "resource-description"
}, {
    name: "resource data",
    type: "blocks",
    id: "resource-block-data",
    data: []
}, {
    name: "resource text",
    type: "blocks",
    id: "resource-block-text",
    data: []
}]

module.exports = { resourceSchema }