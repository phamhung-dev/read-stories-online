const Chapter = require("./../models/Chapter");
const PictureBook = require("./../models/PictureBook");
const { cleanProperties } = require('./../validator/RequestValidate');

async function findAll() {
    try {
        return await Chapter.find();
    }
    catch (err) {
        throw err;
    }
}

async function findById(id) {
    try {
        return await Chapter.findById(id);
    }
    catch (err) {
        throw err;
    }
}


//TODO: find chapter by picture book
async function findByPictureBook(id) {
    try {
        return await Chapter.find({ pictureBook: id });
    }
    catch (err) {
        throw err;
    }
}
//TODO: recheck create function
async function create(data) {
    allowedProperties = {
        name: true,
        orderNumber: true,
        pictureBook: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var chapter = await Chapter.findOne({ name: dataClean.name, orderNumber: dataClean.orderNumber });
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

module.exports = { findAll, findById, findByPictureBook, create };