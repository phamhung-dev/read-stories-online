const roleUserService = require('../services/RoleUserService');

async function create(req, res, next) {
    try {
        const roleUser = await roleUserService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: roleUser});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}
async function destroy(req, res, next) {
    try {
        const roleUser = await roleUserService.destroy(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: roleUser});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { create, destroy };