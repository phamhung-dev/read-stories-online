const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(slug);
mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const GenreSchema = new Schema({
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
    description: {
        type: String,
        trim: true,
        maxlength: 2048
    },
    published: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        collection: 'Genres'
    }
);

const Genre = mongoose.model("Genre", GenreSchema);

module.exports = Genre;