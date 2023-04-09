const Comment = require("./../models/Comment");
const { cleanProperties } = require('./../validator/RequestValidate');

async function findAll() {
    try {
        return await Comment.find();
    }
    catch (err) {
        throw err;
    }
}

async function create(data){
    allowedProperties = {
        content: true,
        user: true,
        pictureBook: true
    };

    dataClean = cleanProperties(data, allowedProperties);
    var newComment = new Comment(dataClean);
    try {
        await newComment.save();
        return newComment;
    }
    catch (err) {
        throw err;
    }
}

async function destroy(id){
    //delete comment
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            throw new Error("Comment not found");
        }
        return await Comment.findByIdAndDelete(id);
    }
    catch (err) {
        throw err;
    }
}

module.exports = { findAll, create, destroy };