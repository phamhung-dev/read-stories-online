const Genre = require("./../models/Genre");
const { cleanProperties } = require('./../validator/RequestValidate');

async function findAll() {
    try {
        return await Genre.find({});
    }
    catch (err) {
        throw err;
    }
};

async function findById(id) {
    try {
        const genre = await Genre.findById(id);
        if (!genre) {
            throw new Error("Genre not found");
        }
        return await Genre.findById(id);
    }
    catch (err) {
        throw err;
    }
};

async function create(data){
    allowedProperties = {
        name: true,
        description: true,
        published: true
    };
    dataClean = cleanProperties(data, allowedProperties);
    var genre = await Genre.findOne({name: dataClean.name});
    if (genre) {
        throw new Error("Genre already exists");
    }
    var newGenre = new Genre(dataClean);
    try {
        await newGenre.save();
        return newGenre;
    }
    catch (err) {
        throw err;
    }
}

async function update(id, data){
    allowedProperties = {
        name: true,
        description: true,
    };
    dataClean = cleanProperties(data, allowedProperties);
    try {
        const genre = await Genre.findById(id);
        if (!genre) {
            throw new Error("Genre not found");
        }
        //check if genre name is already existed    
        var genreName = await Genre.findOne({name: dataClean.name});
        if(genre.name == dataClean.name)
        {
            genre.name = dataClean.name;
            genre.description = dataClean.description;
            await genre.save();
        }else
        if(genreName)
        {
            throw new Error("Genre name already exists");
        }
        return genre;
    }
    catch (err) {
        throw err;
    }
}

async function findAllPublished() {
    try {
        return await Genre.find({published: true});
    }
    catch (err) {
        throw err;
    }
}

module.exports = { findAll, findById, create, update, findAllPublished };