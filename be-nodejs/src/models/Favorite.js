const mongoose = require("mongoose");
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const FavoriteSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    pictureBook: {
        type: ObjectId,
        ref: 'PictureBook',
        required: true
    }
},
    {
        timestamps: true,
        collection: 'Favorites'
    }
);

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;