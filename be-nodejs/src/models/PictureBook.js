const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(slug);
mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PictureBookSchema = new Schema({
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
    releaseAt: {
        type: Date,
        required: true
    },
    avatar: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        trim: true,
        maxlength: 2048,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        mim: 0,
        default: 0
    },
    views: {
        type: Number,
        required: true,
        mim: 0,
        default: 0
    },
    scoreRating: {
        type: Number,
        required: true,
        mim: 0,
        max: 5,
        default: 0
    },
    numberOfRating: {
        type: Number,
        required: true,
        mim: 0,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['COMING_SOON', 'AVAILABLE', 'COMPLETED'],
        default: 'COMING_SOON'
    },
    published: {
        type: Boolean,
        required: true,
        default: true
    },
    author: {
        type: ObjectId,
        ref: "Author",
        required: true,
    },
    genre: {
        type: ObjectId,
        ref: "Genre",
        required: true
    },
    favorite: {
        type: ObjectId,
        ref: "Favorite",
        required: true
    }
},
    {
        timestamps: true,
        collection: 'PictureBooks'
    }
);
PictureBookSchema.path('name').validate(async (value) => {
    const nameCount = await mongoose.models.PictureBook.countDocuments({ name: value });
    return !nameCount;
}, 'Name has already been taken.');
const PictureBook = mongoose.model("PictureBook", PictureBookSchema);

module.exports = PictureBook;