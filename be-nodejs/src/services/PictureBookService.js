const PictureBook = require("./../models/PictureBook");
const Genre = require("./../models/Genre");
const Chapter = require("./../models/Chapter");
const Page = require("./../models/Page");
const { cleanProperties } = require('./../validator/RequestValidate');
const { cloudinary } = require("./../../config/CloudinaryConfig");

const populateQuery = [{path: "genre", select: ["name", "slug"]}, {path: "author", select: ["name", "slug"]}];
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

async function findRecentRelease(){
    try {
        return await PictureBook.find({published: true}).populate(populateQuery).sort({releaseAt: -1}).limit(7);
    }
    catch (err) {
        throw err;
    }
}

async function findNew(){
    try {
        return await PictureBook.find({published: true}).populate(populateQuery).sort({createdAt: -1}).limit(3);
    }
    catch (err) {
        throw err;
    }
}

async function findRecentUpdated(){
    try {
        return await PictureBook.find({published: true}).populate(populateQuery).sort({updatedAt: -1}).limit(9);
    }
    catch (err) {
        throw err;
    }
}

async function findMostViewed(){
    try {
        return await PictureBook.find({published: true}).populate(populateQuery).sort({views: -1}).limit(9);
    }
    catch (err) {
        throw err;
    }
}

async function findTopRated(){
    try {
        return await PictureBook.find({published: true}).populate(populateQuery).sort({numberOfRating: -1}).limit(9);
    }
    catch (err) {
        throw err;
    }
}

async function findByGenre(slug){
    try {
        var genre = await Genre.findOne({slug: slug});
        if(!genre){
            throw new Error("Genre not found");
        }
        return await PictureBook.find({genre: genre._id, published: true}).populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function findBySlug(slug){
    try {
        var pictureBook = await PictureBook.findOne({slug: slug, published: true}).populate(populateQuery);
        if(!pictureBook){
            throw new Error("Picture book not found");
        }
        return pictureBook;
    }
    catch (err) {
        throw err;
    }
}

async function findAllChapters(slug){
    try {
        var pictureBook = await PictureBook.findOne({slug: slug, published: true}).populate(populateQuery);
        if(!pictureBook){
            throw new Error("Picture book not found");
        }
        var chapters = await Chapter.find({pictureBook: pictureBook._id}).sort({orderNumber: 1});
        return chapters;
    }
    catch (err) {
        throw err;
    }
}

async function findPages(slugPictureBook, slugChapter, page){
    try {
        var pictureBook = await PictureBook.findOne({slug: slugPictureBook, published: true});
        if(!pictureBook){
            throw new Error("Picture book not found");
        }
        var chapter = await Chapter.findOne({pictureBook: pictureBook._id, slug: slugChapter});
        if(!chapter){
            throw new Error("Chapter not found");
        }
        console.log(page);
        if((page - 1) * 5 > await Page.countDocuments({chapter: chapter._id})){
            return [];
        }
        else{
            var pages = await Page.find({chapter: chapter._id}).sort({pageNumber: 1}).skip((page - 1) * 5).limit(5);
            return pages;
        }
    }
    catch(err){
        throw err;
    }
}
module.exports = { findAll, findAllPublished, create, update, show, destroy, findRecentRelease, findNew, findRecentUpdated, findMostViewed, findTopRated, findByGenre, findBySlug, findAllChapters, findPages };