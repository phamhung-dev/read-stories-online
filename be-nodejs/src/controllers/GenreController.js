const genreService = require('./../services/GenreService');

async function findAll(req, res) {
    try {
        const genres = await genreService.findAll();
        res.status(200).json({message: 'SUCCESS', data: genres});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findById(req, res) {
    try {
        const genre = await genreService.findById(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: genre});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function create(req, res){
    try {
        const genre = await genreService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: genre});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function update(req, res){
    try {
        const genre = await genreService.update(req.params.id, req.body);
        res.status(200).json({message: 'SUCCESS', data: genre});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { findAll, findById, create, update };