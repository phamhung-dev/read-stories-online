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

async function findRecentRelease(req, res) {
    try {
        const pictureBooks = await pictureBookService.findRecentRelease();
        res.status(200).json({message: 'SUCCESS', data: pictureBooks});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findNew(req, res){
    try {
        const pictureBooks = await pictureBookService.findNew();
        res.status(200).json({message: 'SUCCESS', data: pictureBooks});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findRecentUpdated(req, res){
    try {
        const pictureBooks = await pictureBookService.findRecentUpdated();
        res.status(200).json({message: 'SUCCESS', data: pictureBooks});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findMostViewed(req, res){
    try {
        const pictureBooks = await pictureBookService.findMostViewed();
        res.status(200).json({message: 'SUCCESS', data: pictureBooks});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findTopRated(req, res){
    try {
        const pictureBooks = await pictureBookService.findTopRated();
        res.status(200).json({message: 'SUCCESS', data: pictureBooks});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findByGenre(req, res){
    try {
        const pictureBooks = await pictureBookService.findByGenre(req.params.slug);
        res.status(200).json({message: 'SUCCESS', data: pictureBooks});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findBySlug(req, res){
    try {
        const pictureBook = await pictureBookService.findBySlug(req.params.slug);
        res.status(200).json({message: 'SUCCESS', data: pictureBook});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findAllChapters(req, res){
    try {
        const chapters = await pictureBookService.findAllChapters(req.params.slug);
        res.status(200).json({message: 'SUCCESS', data: chapters});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findPages(req, res){
    try {
        const pages = await pictureBookService.findPages(req.params.slugPictureBook, req.params.slugChapter, req.body.page);
        res.status(200).json({message: 'SUCCESS', data: pages});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { findAll, findAllPublished, create, update, show, destroy, findRecentRelease, findNew, findRecentUpdated, findMostViewed, findTopRated, findByGenre, findBySlug, findAllChapters, findPages };