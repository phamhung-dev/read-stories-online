const express = require('express');
const historyApi = express.Router();
const historyController = require('./../../src/controllers/HistoryController');
const authenticate = require('./../../src/middlewares/Authenticate');

historyApi.post('/write', authenticate, historyController.writeHistory);
historyApi.get('/get', authenticate, historyController.getHistoryByUser);

module.exports = historyApi;
