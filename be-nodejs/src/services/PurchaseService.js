const Purchase = require("./../models/Purchase");
const { cleanProperties } = require('./../validator/RequestValidate');

const populateQuery = [
    { path: "pictureBook", select: ["name", "slug"] },
    { path: "user", select: "name" }
];

async function findAll() {
    try {
        return await Purchase.find({}).populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function findById(id) {
    try {
        return await Purchase.findById(id).populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function findByUser(userId) {
    try {
        return await Purchase.find({ user: userId }).populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function findByPictureBook(pictureBookId) {
    try {
        return await Purchase.find({ pictureBook: pictureBookId }).populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

async function update(id, data){
    allowedProperties = {
        status: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var purchase = await Purchase.findById(id);
    if (!purchase) {
        throw new Error("Purchase not found");
    }
    try {
        purchase.status = dataClean.status;
        await purchase.save();
        return purchase.populate(populateQuery);
    }
    catch (err) {
        throw err;
    }
}

module.exports = { findAll, findById, findByUser, findByPictureBook, update };