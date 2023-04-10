const express = require('express');
const roleApi = express.Router();
const roleController = require('./../../src/controllers/RoleController');

roleApi.get('/', roleController.findAll);
roleApi.get('/:id', roleController.findById);
roleApi.post('/create', roleController.create);
roleApi.put("/:id/update", roleController.update);
roleApi.delete("/:id/destroy", roleController.destroy);


module.exports = roleApi;
