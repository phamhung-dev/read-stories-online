const chapterService = require('../services/ChapterService');

async function findAll(req, res) {
    try {
        const chapters = await chapterService.findAll();
        res.status(200).json({message: 'SUCCESS', data: chapters});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findById(req, res) {
    try {
        const chapter = await chapterService.findById(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: chapter});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findByPictureBookId(req, res) {
    try {
        const chapters = await chapterService.findByPictureBookId(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: chapters});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function create(req, res) {
    try {
        const chapter = await chapterService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: chapter});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { findAll, create, findById, findByPictureBookId };
