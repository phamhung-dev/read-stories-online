const PictureBook = require("./../models/PictureBook");
const { cleanProperties } = require('./../validator/RequestValidate');

async function findAll(){
    try {
        return await PictureBook.findAll().populate("genre", "name");
    }
    catch (err) {
        throw err;
    }
}

async function findAllPublished(){
    try {
        return await PictureBook.find({published: true});
    }
    catch (err) {
        throw err;
    }
}

async function create(data){
    allowedProperties = {
        name: true,
        author: true,
        releaseAt: true,
        avatar: true,
        content: true,
        price: true,
        genre: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var pictureBook = new PictureBook(dataClean);
    try {
        await pictureBook.save();
        return pictureBook;
    }
    catch (err) {
        throw err;
    }
}

module.exports = { findAll, findAllPublished, create };