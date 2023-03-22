const pageSchema = [{
        name: "title",
        type: "text",
        input_id: "title"
    }, {
        name: "page Seo",
        type: "group",
        data: [{
            name: "description",
            type: "text",
            input_id: "page-description"
        }, {
            name: "keywords",
            type: "text",
            input_id: "page-keywords"
        }]
    },
    {
        name: "Header Image",
        type: "upload-image",
        input_id: "header-image"
    },
    {
        name: "page Data",
        type: "blocks",
        id: "page-data-block-area",
        data: []
    }
]

module.exports = { pageSchema }