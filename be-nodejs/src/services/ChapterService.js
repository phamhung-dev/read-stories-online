const Chapter = require("./../models/Chapter");
const PictureBook = require("./../models/PictureBook");
const { cleanProperties } = require('./../validator/RequestValidate');

const populateQuery = { path: 'pictureBook', select: ['name', 'slug'] };

async function findAll() {
    try {
        return await Chapter.find().populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function findById(id) {
    try {
        return await Chapter.findById(id).populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}



async function findByPictureBook(id) {
    try {
        return await Chapter.find({ pictureBook: id });
    }
    catch (err) {
        throw err;
    }
}

async function create(data) {
    allowedProperties = {
        name: true,
        orderNumber: true,
        pictureBook: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var chapter = await Chapter.findOne({ name: dataClean.name, orderNumber: dataClean.orderNumber, pictureBook: dataClean.pictureBook });
    if (chapter) {
        throw new Error("Chapter already exists");
    }
    var newChapter = new Chapter(dataClean);
    try {
        await newChapter.save();
        return newChapter;
    }
    catch (err) {
        throw err;
    }
}

async function update(id, data) {
    allowedProperties = {
        name: true,
        orderNumber: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    try {
        const chapter = await Chapter.findById(id);
        if (!chapter) {
            throw new Error("Chapter not found");
        }
        var currentChapter = await Chapter.findOne({ name: dataClean.name, orderNumber: dataClean.orderNumber, pictureBook: chapter.pictureBook });
        if (currentChapter && currentChapter._id.toString() != chapter._id.toString()) {
            throw new Error("Chapter already exists");
        }
        chapter.name = dataClean.name;
        chapter.orderNumber = dataClean.orderNumber;
        await chapter.save();
        return chapter;
    }
    catch (err) {
        throw err;
    }
}



module.exports = { findAll, findById, findByPictureBook, create, update };