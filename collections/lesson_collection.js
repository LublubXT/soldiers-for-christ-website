const lessonSchema = [{
        name: "title",
        type: "text",
        input_id: "title"
    }, {
        name: "lesson name",
        type: "text",
        input_id: "lesson-name"
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
        name: "recordings",
        type: "blocks",
        id: "recording-data-block-area",
        data: []
    }, {
        name: "page data",
        type: "blocks",
        id: "page-data-block-area",
        data: []
    }
]

module.exports = { lessonSchema }