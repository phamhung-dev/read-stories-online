const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(slug);
mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const AuthorSchema = new Schema({
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
    }
},
    {
        timestamps: true,
        collection: 'Authors'
    }
);

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;