const historyService = require('./../services/HistoryService');

async function writeHistory(req, res) {
    try {
        var history = await historyService.writeHistory(req.body);
        res.status(200).json({ message: 'SUCCESS', data: history });
    }
    catch (err) {
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

async function getHistoryByUser(req, res) {
    try {
        var history = await historyService.getHistoryByUser(req.user.id);
        res.status(200).json({ message: 'SUCCESS', data: history });
    }
    catch (err) {
        res.status(400).json({ message: 'ERROR', data: { content: err.message } });
    }
}

module.exports = { writeHistory, getHistoryByUser };