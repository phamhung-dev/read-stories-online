const express = require('express');
const roleUserApi = express.Router();
const roleUserController = require('./../../src/controllers/RoleUserController');

roleUserApi.post('/create', roleUserController.create);
roleUserApi.delete('/:id/destroy', roleUserController.destroy);

module.exports = roleUserApi;