const History = require("./../models/History");
const Page = require("./../models/Page");
const { cleanProperties } = require('./../validator/RequestValidate');

const populateQuery = [{ path: "user", select: "name" }, { path: "page", select: "pageNumber" }];

async function writeHistory(data) {
    allowedProperties = {
        user: true,
        page: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var history = await History.findOne({ user: dataClean.user, page: dataClean.page });
    try {
        if (history) {
            history.page = dataClean.page;
            await history.save();
            return history.populate(populateQuery);
        }
        else {
            var newHistory = new History(dataClean);
            await newHistory.save();
            return newHistory.populate(populateQuery);
        }
    }
    catch (err) {
        throw err;
    }
}

async function getHistoryByUser(userId) {
    try {
        var history = await History.findOne({ user: userId }).populate(populateQuery);
        if (!history) {
            throw new Error("History not found");
        }
        return history;
    }
    catch (err) {
        throw err;
    }
}

module.exports = { writeHistory, getHistoryByUser };