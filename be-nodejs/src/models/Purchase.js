const mongoose = require("mongoose");
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PurchaseSchema = new Schema({
    id: {
        type: ObjectId
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    pictureBook: {
        type: ObjectId,
        ref: 'PictureBook',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['SUCCESS', 'FAILED'],
        default: 'FAILED'
    }
},
    {
        timestamps: true,
        collection: 'Histories'
    }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);

module.exports = Purchase;