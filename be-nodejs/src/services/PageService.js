const Page = require("./../models/Page");
const { cleanProperties } = require('./../validator/RequestValidate');
const { cloudinary } = require("./../../config/CloudinaryConfig");

const populateQuery = [{path:"chapter", select: ["name","slug"]}];
const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];


async function findAll(){
    try {
        return await Page.find({}).populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function findById(id){
    try{
        return await Page.find({_id:id}).populate(populateQuery);
    }
    catch(err){
        throw err;
    }
}


async function findByChapter(chapterId){
    try{
        return await Page.find({chapter:chapterId}).sort({pageNumber:1}).populate(populateQuery);
    }
    catch(err){
        throw err;
    }
}


async function create(data){
    allowedProperties={
        image : true,
        content : true,
        pageNumber : true,
        chapter : true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var page = await Page.findOne({chapter: dataClean.chapter, pageNumber: dataClean.pageNumber});
    if (page) {
        throw new Error("Page already exists");
    }
    try {
        var newPage = new Page(dataClean);
        await newPage.save();
        return newPage.populate(populateQuery);
    }
    catch (err) {
        throw err;
    }

}

async function update(id, data){
    allowedProperties={
        image : true,
        content : true,
        pageNumber : true,
        chapter : true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var page = await Page.findById(id);
    if (!page) {
        throw new Error("Page not found");
    }
    var imgUrl = page.image;
    if (imgUrl && imgUrl !== dataClean.image) {
        var publicId = getPublicId(imgUrl);
        await cloudinary.uploader.destroy(publicId);
    }
    try {
        page = await Page.findOneAndUpdate({_id: id}, dataClean, {new: true}).populate(populateQuery);
        return page;
    }
    catch (err) {
        throw err;
    }

}    

async function destroy(id){
    try{
        var page = await Page.findById(id);
        if (!page) {
            throw new Error("Page not found");
        }
        var imgUrl = page.image;
        if (imgUrl) {
            var publicId = getPublicId(imgUrl);
            await cloudinary.uploader.destroy(publicId);
        }
        return await page.remove();
    }
    catch(err){
        throw err;
    }
}

async function show(id){
    try{
        var page = await Page.findById(id);
        if (!page) {
            throw new Error("Page not found");
        }
        return page.populate(populateQuery);
    }
    catch(err){
        throw err;
    }
}

module.exports = { findAll, findById, findByChapter, create, update, destroy, show };