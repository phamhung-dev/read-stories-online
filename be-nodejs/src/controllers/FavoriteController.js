const favoriteService = require('./../services/FavoriteService');

async function create(req, res) {
    try {
        const favorite= await favoriteService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: favorite});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function destroy(req, res) {
    try {
        const favorite = await favoriteService.destroy(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: favorite});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { create, destroy };
