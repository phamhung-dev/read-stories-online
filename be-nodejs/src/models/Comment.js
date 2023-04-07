const mongoose = require("mongoose");
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
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
    content: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true,
        collection: 'Comments'
    }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;