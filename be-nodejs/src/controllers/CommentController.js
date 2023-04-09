const commentService = require('../services/CommentService');

async function create(req, res) {
    try {
        const comment = await commentService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: comment});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findAll(req, res) {
    try {
        const comments = await commentService.findAll();
        res.status(200).json({message: 'SUCCESS', data: comments});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function destroy(req, res) {
    try {
        const comment = await commentService.destroy(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: comment});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { create, findAll, destroy };