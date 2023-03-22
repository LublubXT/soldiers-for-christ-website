var savedData = []
var blocks_id_list = []
var blocks_name_list = []
var blocks_amount = 0
var blocks_text_input_type = []
var blocks_text_divider_type = []
var blocks_divider_type = []
var block_data = []

// console.log("editcollectionitem.js file is loaded!")

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

const returnHtmlBlock = (schema) => {
    var code = ``
    if (schema.type == 'text') {
        code += `
                    <div style="margin-bottom: 20px;">
                        <p class="schemaItemInputAboveText" style="margin-bottom: 5px; text-transform: capitalize; margin-top: 0px;">${schema.name}</p>
                        <input class="dataInputClass" type="text" style="width: calc(100% - 30px);" id="${schema.input_id}">
                    </div>`
    } else if (schema.type == 'number') {
        code += `
                    <div style="margin-bottom: 20px;">
                        <p class="schemaItemInputAboveText" style="margin-bottom: 5px; text-transform: capitalize; margin-top: 0px;">${schema.name}</p>
                        <input class="dataInputClass" type="number" style="width: calc(100% - 30px);" id="${schema.input_id}">
                    </div>`
    } else if (schema.type == 'date') {
        code += `
                    <div style="margin-bottom: 20px;">
                        <p class="schemaItemInputAboveText" style="margin-bottom: 5px; text-transform: capitalize; margin-top: 0px;">${schema.name}</p>
                        <input class="dataInputClass" type="date" style="width: calc(100% - 30px);" id="${schema.input_id}">
                    </div>`
    } else if (schema.type == 'divider') {
        code += `
                    <div style="width: 630px; margin-top: 40px;">
                    <hr>
                </div>`
    } else if (schema.type == 'text-divider') {
        code += `<p class="text-divider">${schema.text}</p>`
    } else if (schema.type == 'upload-image') {
        code += `<div style="padding: 5px; border: 1px solid black; width: calc(100% - 12px); display: flex; flex-direction: row; align-content: center; align-items: center; margin-bottom: 20px;">
                    <img src="" id="image-${schema.input_id}" alt="image" style="width: 40%;">
                    <div>  
                        <p class="schemaItemInputAboveText" style="margin-bottom: 0px; margin-left: 14px; text-transform: capitalize; margin-top: 10px;">${schema.name}</p>
                        <input type="file" accept="image/*" class="image-upload-input" name="upload-file" onchange="previewImage('${schema.input_id}')" style="border: none;" id="files-${schema.input_id}">
                        <input type="text" class="dataInputClass" style="display: none;" id="${schema.input_id}">
                    </div>
                </div>`
    } else if (schema.type == 'upload-file') {
        code += `<div style="padding: 5px; border: 1px solid black; width: calc(100% - 12px); display: flex; flex-direction: row; align-content: center; align-items: center; margin-bottom: 20px;">
                    <input class="dataInputClass" id="${schema.input_id}" style="margin-bottom: 0px; margin-left: 14px; text-transform: capitalize; margin-top: 0px; width: 40%; border: none; text-transform: none;" disabled>         
                    <div>  
                        <p class="schemaItemInputAboveText" style="margin-bottom: 0px; margin-left: 14px; text-transform: capitalize; margin-top: 10px;">${schema.name}</p>
                        <input type="file" class="image-upload-input" name="upload-file" onchange="previewSetFile('${schema.input_id}')" style="border: none;" id="files-${schema.input_id}">
                    </div>
                </div>`
    }


    return code
}

const previewImage = (id) => {
    console.log(id)
    const [file] = document.getElementById(`files-${id}`).files
    if (file) {
        document.getElementById(`image-${id}`).src = URL.createObjectURL(file)
        document.getElementById(`${id}`).value = `uploads/${file.name}`
        console.log(file.name)
    }
}

const previewSetFile = (id) => {
    console.log(id)
    const [file] = document.getElementById(`files-${id}`).files
    if (file) {
        document.getElementById(`${id}`).value = `uploads/${file.name}`
        console.log(file.name)
    }
}


const returnHtmlGroupBlock = (schema) => {
    var innerCode = ``

    for (item in schema.data) {

        innerCode += returnHtmlBlock(schema.data[item])
    }

    var code = `
                    <div style="border: 1px solid black; width: 100%; max-width: calc(600px + 28px); margin-bottom: 40px; margin-top:10px;">
                        <p class="schemaItemTitle" style="margin-bottom: 5px; text-transform: uppercase; font-weight: 700; color: white; background-color: black; margin: 0px 0px 0px 0px; padding: 5px;">
                            ${schema.name}</p>
                        <div style=" padding: 30px 30px 30px 30px;">
                            ${innerCode}
                        </div>
                    </div>
                `


    return code
}

const returnBlocksBlock = (schema) => {
    var blocks = ``


    for (block in blockListData) {
        blocks += `<div onclick="addBlock('${blockListData[block].type}', '${schema.id}', {name: '', data: '', text: ''})">
                        <p class="blockItem">${blockListData[block].display_name}</p>
                    </div>`
    }

    // blocks_id_list.push(schema.id)
    // blocks_name_list.push(schema.name)

    var code = `
                    <div style="border: 1px solid black; width: 100%; max-width: calc(600px + 28px); margin-bottom: 40px; margin-top:10px;">
                        <p class="schemaItemTitle" style="margin-bottom: 5px; text-transform: uppercase; font-weight: 700; color: white; background-color: black; margin: 0px 0px 0px 0px; padding: 5px;">
                            ${schema.name}</p>
                        <div style=" padding: 30px 30px 30px 30px;">
                            <div id="${schema.id}">
                                
                            </div>
                            <button class="button-dark" type="button" style="width: fit-content; text-transform: capitalize; margin-top:20px;" onclick="showBlocks('${schema.id}')">Add Block</button>
                            <div class="blockListArea" style="display: none;" id="blockListArea-${schema.id}">
                                ${blocks}
                            </div>
                        </div>
                    </div>
                `


    return code
}

const returnAddBlock = (schema, blockId, blockAreaId) => {
    var code = ``
    if (schema.type == 'text') {
        code += `
                    <div style="margin-bottom: 20px;">
                        <input id="blockName-${schema.id}" value="${schema.name_value}" class="blockTextInput schemaItemInputAboveText" style="margin-bottom: 5px; text-transform: capitalize; margin-top: 0px; outline: none; border: none; padding: 2px 0px;" placeholder="name...">
                        <input class="block dataBlockInputClass${blockAreaId}" value="${schema.data_value}" type="text" style="width: calc(100% - 30px);" id="${schema.id}">
                    </div>`
    } else if (schema.type == 'divider') {
        code += `<hr class="block dataBlockDivider${blockAreaId}">`
    } else if (schema.type == 'text-divider') {
        code += `<input class="text-divider dataBlockTextDivider${blockAreaId}" value="${schema.data}" id="${schema.id}" style="outline: none; width: calc(100% - 12px)" placeholder="Text...">`
    } else if (schema.type == 'upload-image') {
        code += `<div style="padding: 5px; border: 1px solid black; width: calc(100% - 12px); display: flex; flex-direction: row; align-content: center; align-items: center; margin-bottom: 20px;">
                    <img src="${schema.data_value}" id="image-${schema.id}" alt="image" style="width: 40%;">
                    <div>  
                        <input id="blockName-${schema.id}" value="${schema.name_value}" class="blockTextInput schemaItemInputAboveText" style="margin-bottom: 0px; text-transform: capitalize; margin-top: 10px; margin-left: 14px; outline: none; border: none; padding: 2px 0px;" placeholder="name...">
                        <input type="file" accept="image/*" class="image-upload-input" name="upload-file" onchange="previewImage('${schema.id}')" style="border: none;" id="files-${schema.id}">
                        <input type="text" class="dataBlockInputClass${blockAreaId}" value="${schema.data_value}" style="display: none;" id="${schema.id}">
                    </div>
                </div>`
    } else if (schema.type == 'upload-file') {
        code += `<div style="padding: 5px; border: 1px solid black; width: calc(100% - 12px); display: flex; flex-direction: row; align-content: center; align-items: center; margin-bottom: 20px;">
                    <input class="dataInputClass" value="${schema.data_value}" id="${schema.id}" style="margin-bottom: 0px; margin-left: 14px; text-transform: capitalize; margin-top: 0px; width: 40%; border: none; text-transform: none;" disabled>     
                    <div>  
                        <input id="blockName-${schema.id}" value="${schema.name_value}" class="blockTextInput schemaItemInputAboveText" style="margin-bottom: 0px; text-transform: capitalize; margin-top: 10px; margin-left: 14px; outline: none; border: none; padding: 2px 0px;" placeholder="name...">
                        <input type="file" class="image-upload-input" name="upload-file" onchange="previewSetFile('${schema.id}')" style="border: none;" id="files-${schema.id}">
                    </div>
                </div>`
    }


    return code
}

const addBlockDataToList = () => {
    for (var i = 0; i < block_data.length; i++) {
        // console.log("block id", block_data[i].id)
        if (block_data[i].type == 'paragraph') {
            // console.log("getting paragraph data 12", block_data[i].id)
            block_data[i].name = document.getElementById(`blockName-${block_data[i].id}`).value
            block_data[i].data = document.getElementById(`${block_data[i].id}`).value
        } else if (block_data[i].type == 'heading1') {
            // console.log("getting text-divider data 12", block_data[i].id)
            block_data[i].name = document.getElementById(`blockName-${block_data[i].id}`).value
            block_data[i].data = document.getElementById(`${block_data[i].id}`).value
        } else if (block_data[i].type == 'heading2') {
            // console.log("getting text-divider data 12", block_data[i].id)
            block_data[i].name = document.getElementById(`blockName-${block_data[i].id}`).value
            block_data[i].data = document.getElementById(`${block_data[i].id}`).value
        } else if (block_data[i].type == 'heading3') {
            // console.log("getting text-divider data 12", block_data[i].id)
            block_data[i].name = document.getElementById(`blockName-${block_data[i].id}`).value
            block_data[i].data = document.getElementById(`${block_data[i].id}`).value
        } else if (block_data[i].type == 'heading4') {
            // console.log("getting text-divider data 12", block_data[i].id)
            block_data[i].name = document.getElementById(`blockName-${block_data[i].id}`).value
            block_data[i].data = document.getElementById(`${block_data[i].id}`).value
        } else if (block_data[i].type == 'text-divider') {
            // console.log("getting text-divider data 12", block_data[i].id)
            block_data[i].data = document.getElementById(`${block_data[i].id}`).value
        } else if (block_data[i].type == 'upload-image') {
            // console.log("getting text-divider data 12", block_data[i].id)
            block_data[i].name = document.getElementById(`blockName-${block_data[i].id}`).value
            block_data[i].data = document.getElementById(`${block_data[i].id}`).value
        } else if (block_data[i].type == 'upload-file') {
            // console.log("getting text-divider data 12", block_data[i].id)
            block_data[i].name = document.getElementById(`blockName-${block_data[i].id}`).value
            block_data[i].data = document.getElementById(`${block_data[i].id}`).value
        } else if (block_data[i].type == 'upload-video') {
            // console.log("getting text-divider data 12", block_data[i].id)
            block_data[i].name = document.getElementById(`blockName-${block_data[i].id}`).value
            block_data[i].data = document.getElementById(`${block_data[i].id}`).value
        } else if (block_data[i].type == 'upload-audio') {
            // console.log("getting text-divider data 12", block_data[i].id)
            block_data[i].name = document.getElementById(`blockName-${block_data[i].id}`).value
            block_data[i].data = document.getElementById(`${block_data[i].id}`).value
        }

    }
}

const addBlock = (type, id, schema) => {
    savedData = []
    var index = 0

    // console.log(block_data, block_data.length, id, schema)
    var string_id = generateString(10)

    var new_schema = {
        block_area_id: id,
        type: type,
        name: schema.name,
        data: schema.data,
        id: string_id
    }

    // console.log("Bocasd asdfa before", block_data)

    addBlockDataToList()


    var doc = document.getElementById(`${id}`)
    if (type == 'paragraph') {


        doc.innerHTML += returnAddBlock({
            type: 'text',
            name_value: schema.name,
            data_value: schema.data,
            id: string_id
        }, string_id, id)

    } else if (type == 'divider') {
        doc.innerHTML += returnAddBlock({
            type: 'divider',
            id: string_id
        }, string_id, id)

    } else if (type == 'text-divider') {
        doc.innerHTML += returnAddBlock({
            type: 'text-divider',
            data: schema.data,
            id: string_id
        }, string_id, id)

    } else if (type == 'upload-image') {
        doc.innerHTML += returnAddBlock({
            type: 'upload-image',
            name_value: schema.name,
            data_value: schema.data,
            id: string_id
        }, string_id, id)

    } else if (type == 'upload-file') {
        doc.innerHTML += returnAddBlock({
            type: 'upload-file',
            name_value: schema.name,
            data_value: schema.data,
            id: string_id
        }, string_id, id)

    } else if (type == 'upload-video') {
        doc.innerHTML += returnAddBlock({
            type: 'upload-file',
            name_value: schema.name,
            data_value: schema.data,
            id: string_id
        }, string_id, id)

    } else if (type == 'upload-audio') {
        doc.innerHTML += returnAddBlock({
            type: 'upload-file',
            name_value: schema.name,
            data_value: schema.data,
            id: string_id
        }, string_id, id)

    } else if (type == 'heading1') {
        doc.innerHTML += returnAddBlock({
            type: 'text',
            name_value: schema.name,
            data_value: schema.data,
            id: string_id
        }, string_id, id)

    } else if (type == 'heading2') {
        doc.innerHTML += returnAddBlock({
            type: 'text',
            name_value: schema.name,
            data_value: schema.data,
            id: string_id
        }, string_id, id)

    } else if (type == 'heading3') {
        doc.innerHTML += returnAddBlock({
            type: 'text',
            name_value: schema.name,
            data_value: schema.data,
            id: string_id
        }, string_id, id)

    } else if (type == 'heading4') {
        doc.innerHTML += returnAddBlock({
            type: 'text',
            name_value: schema.name,
            data_value: schema.data,
            id: string_id
        }, string_id, id)

    }


    for (var i = 0; i < block_data.length; i++) {
        if (block_data[i].type == 'paragraph') {
            document.getElementById(`blockName-${block_data[i].id}`).value = block_data[i].name
            document.getElementById(`${block_data[i].id}`).value = block_data[i].data
        } else if (block_data[i].type == 'text-divider') {
            // console.log("getting text-divider data", document.getElementById(`${block_data[i].id}`).value)
            document.getElementById(`${block_data[i].id}`).value = block_data[i].data
        } else if (block_data[i].type == 'upload-image') {
            // console.log("getting text-divider data", document.getElementById(`${block_data[i].id}`).value)
            document.getElementById(`blockName-${block_data[i].id}`).value = block_data[i].name
            document.getElementById(`${block_data[i].id}`).value = block_data[i].data
        } else if (block_data[i].type == 'upload-file') {
            // console.log("getting text-divider data", document.getElementById(`${block_data[i].id}`).value)
            document.getElementById(`blockName-${block_data[i].id}`).value = block_data[i].name
            document.getElementById(`${block_data[i].id}`).value = block_data[i].data
        } else if (block_data[i].type == 'upload-video') {
            // console.log("getting text-divider data", document.getElementById(`${block_data[i].id}`).value)
            document.getElementById(`blockName-${block_data[i].id}`).value = block_data[i].name
            document.getElementById(`${block_data[i].id}`).value = block_data[i].data
        } else if (block_data[i].type == 'upload-audio') {
            // console.log("getting text-divider data", document.getElementById(`${block_data[i].id}`).value)
            document.getElementById(`blockName-${block_data[i].id}`).value = block_data[i].name
            document.getElementById(`${block_data[i].id}`).value = block_data[i].data
        } else if (block_data[i].type == 'heading1') {
            // console.log("getting text-divider data", document.getElementById(`${block_data[i].id}`).value)
            document.getElementById(`blockName-${block_data[i].id}`).value = block_data[i].name
            document.getElementById(`${block_data[i].id}`).value = block_data[i].data
        } else if (block_data[i].type == 'heading2') {
            // console.log("getting text-divider data", document.getElementById(`${block_data[i].id}`).value)
            document.getElementById(`blockName-${block_data[i].id}`).value = block_data[i].name
            document.getElementById(`${block_data[i].id}`).value = block_data[i].data
        } else if (block_data[i].type == 'heading3') {
            // console.log("getting text-divider data", document.getElementById(`${block_data[i].id}`).value)
            document.getElementById(`blockName-${block_data[i].id}`).value = block_data[i].name
            document.getElementById(`${block_data[i].id}`).value = block_data[i].data
        } else if (block_data[i].type == 'heading4') {
            // console.log("getting text-divider data", document.getElementById(`${block_data[i].id}`).value)
            document.getElementById(`blockName-${block_data[i].id}`).value = block_data[i].name
            document.getElementById(`${block_data[i].id}`).value = block_data[i].data
        }
    }


    block_data.push(new_schema)
        // console.log("Bocasd asdfa after", block_data)

}

const showBlocks = (id) => {
    if (document.getElementById(`blockListArea-${id}`).style.display == 'none') {
        document.getElementById(`blockListArea-${id}`).style.display = 'flex'
    } else if (document.getElementById(`blockListArea-${id}`).style.display == 'flex') {
        document.getElementById(`blockListArea-${id}`).style.display = 'none'
    }
}

const returnHtmlTabData = (schema) => {
    var innerCode = ``

    for (item in schema.data) {
        if (schema.data[item].type == 'text') {
            innerCode += returnHtmlBlock(schema.data[item])
        } else if (schema.data[item].type == 'group') {
            innerCode += returnHtmlGroupBlock(schema.data[item])
        }
    }

    var tabBlock = `
                    <div id="${schema.id}" class="tabcontent">
                        ${innerCode}
                    </div>`


    return tabBlock
}

blocks_id_list = []
blocks_name_list = []
    // console.log("This is blocks_id_list 12", blocks_id_list)
for (var i = 0; i < schemaData.schema.length; i++) {
    schemaArea.innerHTML += returnHtmlBlock(schemaData.schema[i])
    if (schemaData.schema[i].type == 'group') {
        schemaArea.innerHTML += returnHtmlGroupBlock(schemaData.schema[i])
    } else if (schemaData.schema[i].type == 'tab') {
        tabButtonArea.innerHTML += `<button type="button" class="button-dark" style="width: fit-content; text-transform: capitalize; margin-right: 5px;" class="tablinks" onclick="openTab(event, '${schemaData.schema[i].id}')">${schemaData.schema[i].name}</button>`
        tabArea.innerHTML += returnHtmlTabData(schemaData.schema[i])

    } else if (schemaData.schema[i].type == 'blocks') {
        // tabButtonArea.innerHTML += `<button class="button-dark" style="width: fit-content; text-transform: capitalize; margin-right: 5px;" onclick="openBlocks('${schemaData.schema[i].id}')">Add Block</button>`
        schemaArea.innerHTML += returnBlocksBlock(schemaData.schema[i])
            // console.log("Adding blocks... 12")
        blocks_id_list.push(schemaData.schema[i].id)
        blocks_name_list.push(schemaData.schema[i].name)
            // console.log("schemaData --", schemaData.schema[i].id)
        blocks_amount += 1
            // console.log("blockData 12", block_data)
    }
}

// console.log("This is blocks_id_list 12", blocks_id_list)

const save = async() => {
    savedData = []

    addBlockDataToList()

    // console.log("block_data log in save area", block_data)

    var newBlockData = []

    // console.log("THis is the blocks amount", blocks_amount)

    // console.log("This is blocks_id_list", blocks_id_list)

    for (var i = 0; i < blocks_amount; i++) {
        newBlockData = []
        for (var a = 0; a < block_data.length; a++) {
            if (block_data[a].block_area_id == blocks_id_list[i]) {
                console.log("adding block into newBlockData", block_data[a])
                newBlockData.push(block_data[a])
                console.log("saving block", block_data[a])
            }
        }
        // console.log("newBlockData:", newBlockData)
        blockData = await {
                name: blocks_name_list[i],
                id: blocks_id_list[i],
                type: 'blocks',
                data: newBlockData
            }
            // console.log("blockData log", blockData)
        savedData.push(blockData)
    }
    console.log("savedData blalba", savedData)

    const dataInputs = document.getElementById('data-area').getElementsByClassName('dataInputClass')
    for (var i = 0; i < dataInputs.length; i++) {
        savedData.push({
            id: dataInputs[i].id,
            data: document.getElementById(dataInputs[i].id).value
        })
    }
    var newSavedData = {
        name: document.getElementById('title').value,
        slug: titleToSlug(document.getElementById('title').value),
        data: savedData
    }

    console.log("newSavedData", newSavedData)
    document.getElementById('save-data-input').value = await JSON.stringify(newSavedData)
    document.getElementById('save-form').submit()
}

const titleToSlug = title => {
    let slug;

    // convert to lower case
    slug = title.toLowerCase();

    // remove special characters
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

    // replace spaces with dash symbols
    slug = slug.replace(/ /gi, "-");

    // remove consecutive dash symbols 
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');

    // remove the unwanted dash symbols at the beginning and the end of the slug
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
};

var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

function generateString(length) {
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result;
}

var input_id_list = []

for (var i = 0; i < schemaData.schema.length; i++) {
    if (schemaData.schema[i].input_id !== undefined) {
        input_id_list.push(schemaData.schema[i].input_id)
    } else if (schemaData.schema[i].hasOwnProperty("data")) {
        for (a in schemaData.schema[i].data) {
            if (schemaData.schema[i].data[a].input_id !== undefined) {
                input_id_list.push(schemaData.schema[i].data[a].input_id)
            } else if (schemaData.schema[i].data[a].hasOwnProperty("data")) {
                for (b in schemaData.schema[i].data[a].data) {
                    if (schemaData.schema[i].data[a].data[b].input_id !== undefined) {
                        input_id_list.push(schemaData.schema[i].data[a].data[b].input_id)
                    } else if (schemaData.schema[i].data[a].hasOwnProperty("data")) {
                        for (c in schemaData.schema[i].data[a].data[b]) {
                            if (schemaData.schema[i].data[a].data[b].data[c].input_id !== undefined) {
                                input_id_list.push(schemaData.schema[i].data[a].data[b].data[c].input_id)
                            }
                        }
                    }
                }
            }
        }
    }
}

// console.log("input_id_list", input_id_list)

// console.log(collectionData.length)

if (collectionData.length !== 0 || collectionData.length !== undefined) {

    for (var a = 0; a < input_id_list.length; a++) {
        for (var i = 0; i < collectionData.data.length; i++) {
            if (input_id_list[a] == collectionData.data[i].id) {
                if (collectionData.data[i].data.includes('uploads/')) {
                    if (document.getElementById(`image-${collectionData.data[i].id}`) !== null) {
                        document.getElementById(`image-${collectionData.data[i].id}`).src = `${collectionData.data[i].data}`
                    }
                    document.getElementById(`${collectionData.data[i].id}`).value = `${collectionData.data[i].data}`

                } else {
                    // console.log(collectionData.data[i])
                    document.getElementById(collectionData.data[i].id).value = collectionData.data[i].data
                }
            }
        }
    }

    // blocks_amount = 0
    for (var i = 0; i < collectionData.data.length; i++) {
        if (collectionData.data[i].type == 'blocks') {
            // console.log("found block!!!", blocks_amount)
            const doc = document.getElementById(`${collectionData.data[i].id} `)
            for (block in collectionData.data[i].data) {
                // console.log(collectionData.data[i].data[block].data)
                addBlock(collectionData.data[i].data[block].type, collectionData.data[i].id, {
                    name: collectionData.data[i].data[block].name,
                    data: collectionData.data[i].data[block].data,
                })
            }
            // blocks_amount += 1
            // console.log(blocks_amount)
            // const doc = document.getElementById(`${ collectionData.data[i].id } `)
            // blocks_id_list.push(collectionData.data[i].id)
            // blocks_name_list.push(collectionData.data[i].name)
            // for (block in collectionData.data[i].data) {
            //     addBlock(collectionData.data[i].data[block].type, collectionData.data[i].id, {
            //         name: collectionData.data[i].data[block].name,
            //         data: collectionData.data[i].data[block].data,
            //     })
            // }


        }
    }
} else if (collectionData.length == 0) {
    console.log("data is empty")
}

// console.log("edit data", collectionData)