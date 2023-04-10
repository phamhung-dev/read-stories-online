const roleService = require('../services/RoleService');

async function findAll(req, res) {
    try {
        const roles = await roleService.findAll();
        res.status(200).json({message: 'SUCCESS', data: roles});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function findById(req, res) {
    try {
        const role = await roleService.findById(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: role});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function create(req, res) {
    try {
        const role = await roleService.create(req.body);
        res.status(200).json({message: 'SUCCESS', data: role});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function update(req, res) {

    try {
        const role = await roleService.update(req.params.id, req.body);
        res.status(200).json({message: 'SUCCESS', data: role});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

async function destroy(req, res) {
    try {
        const role = await roleService.destroy(req.params.id);
        res.status(200).json({message: 'SUCCESS', data: role});
    }
    catch (err) {
        res.status(400).json({message: 'ERROR', data: {content: err.message}});
    }
}

module.exports = { findAll, findById, create, update, destroy };