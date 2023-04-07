const mongoose = require("mongoose");
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PageSchema = new Schema({
    id: {
        type: ObjectId
    },
    image: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        trim: true
    },
    pageNumber: {
        type: Number,
        required: true,
        min: 1
    },
    chapter: {
        type: ObjectId,
        ref: 'Chapter',
        required: true
    }
},
    {
        timestamps: true,
        collection: 'Pages'
    }
);

PageSchema.index({ chapter: 1, pageNumber: 1 }, { unique: true });

const Page = mongoose.model("Page", PageSchema);

module.exports = Page;