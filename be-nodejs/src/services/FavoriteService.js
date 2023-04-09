const Favorite = require("./../models/Favorite");
const { cleanProperties } = require('./../validator/RequestValidate');

async function create(data) {
    allowedProperties = {
        user: true,
        pictureBook : true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var newFavorite = new Favorite(dataClean);
    try {
        await newFavorite.save();
        return newFavorite;
    }
    catch (err) {
        throw err;
    }
}

async function destroy(id){
    try {
        var favorite = await Favorite.findOne({_id: id});
        if(!favorite){
            throw new Error("Favorite not found");
        }
        favorite = await Favorite.findByIdAndDelete(id);
        return favorite;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {create, destroy};
