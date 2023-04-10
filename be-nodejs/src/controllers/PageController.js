const { cloudinary } = require("../../config/CloudinaryConfig");
const pageService = require("../services/PageService");



const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];


async function findAll(rea,res) {
    try {
        const pages = await pageService.findAll();
        res.status(200).json({message: 'SUCCESS', data: pages});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findById(req, res) {
    try {
        const pages = await pageService.findById(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: pages});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findByChapter(req, res) {
    try {
        const pages = await pageService.findByChapter(req.params.chapterId);
        res.status(200).json({message: 'SUCCESS', data: pages});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}


async function create(req, res) {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }
        const page = await pageService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: page});
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
        if (req.file) {
            req.body.image = req.file.path;
        }
        const page = await pageService.update(req.params.id, req.body);
        res.status(200).json({message: 'SUCCESS', data: page});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function show(req, res) {
    try {
        const page = await pageService.show(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: page});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function destroy(req, res){
    try{
        const page = await pageService.destroy(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: page});
    }
    catch(err){
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { findAll,findByChapter, findById, create, update, show, destroy };