const purchaseService = require("./../services/PurchaseService");

async function findAll(req, res) {
    try {
        const purchases = await purchaseService.findAll();
        res.status(200).json({ message: "SUCCESS", data: purchases });
    }
    catch (err) {
        res.status(400).json({ message: "ERROR", data: { content: err.message } });
    }
}

async function findById(req, res) {
    try {
        const purchase = await purchaseService.findById(req.params.id);
        res.status(200).json({ message: "SUCCESS", data: purchase });
    }
    catch (err) {
        res.status(400).json({ message: "ERROR", data: { content: err.message } });
    }
}

async function findByUser(req, res) {
    try {
        const purchases = await purchaseService.findByUser(req.user.id);
        res.status(200).json({ message: "SUCCESS", data: purchases });
    }
    catch (err) {
        res.status(400).json({ message: "ERROR", data: { content: err.message } });
    }
}

async function findByPictureBook(req, res) {
    try {
        const purchases = await purchaseService.findByPictureBook(req.params.id);
        res.status(200).json({ message: "SUCCESS", data: purchases });
    }
    catch (err) {
        res.status(400).json({ message: "ERROR", data: { content: err.message } });
    }
}

async function update(req, res) {
    try {
        const purchase = await purchaseService.update(req.params.id, req.body);
        res.status(200).json({ message: "SUCCESS", data: purchase });
    }
    catch (err) {
        res.status(400).json({ message: "ERROR", data: { content: err.message } });
    }
}

module.exports = { findAll, findById, findByUser, findByPictureBook, update };