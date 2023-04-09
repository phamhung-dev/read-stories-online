const authorService = require('./../services/AuthorService');

async function findAll(req, res) {
    try{
        const authors = await authorService.findAll();
        res.status(200).json({message: 'SUCCESS', data: authors});
    }
    catch(err){
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findBySlug(req, res) {
    try{
        const authors = await authorService.findBySlug(req.params.slug);
        res.status(200).json({message: 'SUCCESS', data: authors});
    }
    catch(err){
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function create(req, res) {
    try {
        const authors = await authorService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: authors});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function update(req, res) {
    try {
        const authors = await authorService.update(req.params.id , req.body);
        res.status(200).json({message: 'SUCCESS', data: authors});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { findAll, findBySlug, create, update };