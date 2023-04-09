const PictureBook = require("./../models/PictureBook");
const { cleanProperties } = require('./../validator/RequestValidate');
const { cloudinary } = require("./../../config/CloudinaryConfig");

const populateQuery = [{path: "genre", select: "name"}, {path: "author", select: "name"}];
const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];

async function findAll(){
    try {
        return await PictureBook.find({}).populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function findAllPublished(){
    try {
        return await PictureBook.find({published: true}).populate(populateQuery);
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
    var pictureBook = await PictureBook.findOne({name: dataClean.name});
    if (pictureBook) {
        throw new Error("Picture book already exists");
    }
    try {
        var newPictureBook = new PictureBook(dataClean);
        await newPictureBook.save();
        return newPictureBook.populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function update(id, data){
    allowedProperties = {
        name: true,
        author: true,
        releaseAt: true,
        avatar: true,
        content: true,
        price: true,
        status: true,
        published: true,
        genre: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var pictureBook = await PictureBook.findById(id);
    if(!pictureBook){
        throw new Error("Picture book not found");
    }
    var imageURL = pictureBook.avatar;
    pictureBook = await PictureBook.findOne({name: dataClean.name});
    if (pictureBook && pictureBook._id != id) {
        throw new Error("Picture book name already exists");
    }
    try {
        pictureBook = await PictureBook.findOneAndUpdate({_id: id}, dataClean, {new: true}).populate(populateQuery);
        if(dataClean.avatar){
            await cloudinary.uploader.destroy(getPublicId(imageURL));
        }
        return pictureBook.populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function show(id){
    try {
        var pictureBook = await PictureBook.findById(id);
        if(!pictureBook){
            throw new Error("Picture book not found");
        }
        return pictureBook.populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function destroy(id){
    try {
        var pictureBook = await PictureBook.findById(id);
        if(!pictureBook){
            throw new Error("Picture book not found");
        }
        pictureBook = await PictureBook.findByIdAndDelete(id);
        await cloudinary.uploader.destroy(getPublicId(pictureBook.avatar));
        return pictureBook.populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

module.exports = { findAll, findAllPublished, create, update, show, destroy };