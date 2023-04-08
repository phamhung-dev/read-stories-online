const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(slug);
mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ChapterSchema = new Schema({
    id: {
        type: ObjectId
    },
    name: {
        type: String,
        trim: true,
        maxlength: 512,
        required: true,
        unique: true,
        dropDups: true
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
        dropDups: true
    },
    orderNumber: {
        type: Number,
        required: true,
        min: 1
    },
    pictureBook: {
        type: ObjectId,
        ref: 'PictureBook',
        required: true
    }
},
    {
        timestamps: true,
        collection: 'Chapters'
    }
);

ChapterSchema.index({ pictureBook: 1, orderNumber: 1 }, { unique: true });

const Chapter = mongoose.model("Chapter", ChapterSchema);

module.exports = Chapter;