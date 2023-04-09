const express = require('express');
const purchaseApi = express.Router();
const purchaseController = require('./../../src/controllers/PurchaseController');
const authenticate = require('./../../src/middlewares/Authenticate');

purchaseApi.get('/', authenticate, purchaseController.findByUser);
purchaseApi.get('/:id', authenticate, purchaseController.findById);

module.exports = purchaseApi;