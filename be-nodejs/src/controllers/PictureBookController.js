const pictureBookService = require('./../services/PictureBookService');
const { cloudinary } = require("./../../config/CloudinaryConfig");

const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];

async function findAll(req, res) {
    try{
        const pictureBooks = await pictureBookService.findAll();
        res.status(200).json({message: 'SUCCESS', data: pictureBooks});
    }
    catch(err){
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findAllPublished(req, res) {
    try{
        const pictureBooks = await pictureBookService.findAllPublished();
        res.status(200).json({message: 'SUCCESS', data: pictureBooks});
    }
    catch(err){
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function create(req, res) {
    try {
        if(req.file){
            req.body.avatar = req.file.path;
        }
        const pictureBook = await pictureBookService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: pictureBook});
    }
    catch (err) {
        if(req.file){
            await cloudinary.uploader.destroy(getPublicId(req.file.path));
        }
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function update(req, res) {
    try {
        if(req.file){
            req.body.avatar = req.file.path;
        }
        const pictureBook = await pictureBookService.update(req.params.id, req.body);
        res.status(200).json({message: 'SUCCESS', data: pictureBook});
    }
    catch (err) {
        if(req.file){
            await cloudinary.uploader.destroy(getPublicId(req.file.path));
        }
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function show(req, res) {
    try {
        const pictureBook = await pictureBookService.show(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: pictureBook});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function destroy(req, res) {
    try {
        const pictureBook = await pictureBookService.destroy(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: pictureBook});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { findAll, findAllPublished, create, update, show, destroy };