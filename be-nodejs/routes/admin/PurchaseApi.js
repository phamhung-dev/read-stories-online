const express = require('express');
const purchaseApi = express.Router();
const purchaseController = require('./../../src/controllers/PurchaseController');

purchaseApi.get('/', purchaseController.findAll);
purchaseApi.get('/:id', purchaseController.findById);
purchaseApi.get('/picture-book/:id', purchaseController.findByPictureBook);
purchaseApi.put("/:id/update", purchaseController.update);

module.exports = purchaseApi;