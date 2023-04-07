const pictureBookService = require('./../services/PictureBookService');

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
        const pictureBook = await pictureBookService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: pictureBook});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { findAll, findAllPublished, create };