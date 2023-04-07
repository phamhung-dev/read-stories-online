const mongoose = require("mongoose");
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const HistorySchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    page: {
        type: ObjectId,
        ref: 'Page',
        required: true
    }
},
    {
        timestamps: true,
        collection: 'Histories'
    }
);

const History = mongoose.model("History", HistorySchema);

module.exports = History;