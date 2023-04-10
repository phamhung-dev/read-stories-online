const chapterService = require('../services/ChapterService');

async function findAll(req, res) {
    try {
        const chapters = await chapterService.findAll();
        res.status(200).json({message: 'SUCCESS', data: chapters});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', content: err.message});
    }
}

async function findById(req, res) {
    try {
        const chapter = await chapterService.findById(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: chapter});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', content: err.message});
    }
}

async function findByPictureBookId(req, res) {
    try {
        const chapters = await chapterService.findByPictureBookId(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: chapters});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', content: err.message});
    }
}

async function findAllPictureBook(req, res) {
    try {
        const pictureBooks = await chapterService.findAllPictureBook();
        res.status(200).json({message: 'SUCCESS', data: pictureBooks});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', content: err.message});
    }
}

async function create(req, res) {
    try {
        const chapter = await chapterService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: chapter});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', content: err.message});
    }
}

async function update(req, res) {
    try {
        const chapter = await chapterService.update(req.params.id, req.body);
        res.status(200).json({message: 'SUCCESS', data: chapter});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', ontent: err.message});
    }
}

module.exports = { findAll, create, findById, findByPictureBookId, update, findAllPictureBook };
