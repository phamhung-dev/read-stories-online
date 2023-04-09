const Author = require("./../models/Author");
const { cleanProperties } = require('./../validator/RequestValidate');

async function findAll() {
    try {
        return await Author.find({});
    }
    catch (err) {
        throw err;
    }
}

async function findBySlug(slug) {
    try {
      var author = await Author.findOne({ slug: slug });
      if (!author) {
        throw new Error('Author not found');
      }
      return author;
    } catch (err) {
      throw err;
    }
  }
  
async function create(data) {
    allowedProperties = {
        name: true,
    };
    dataClean = cleanProperties(data, allowedProperties);
    var newAuthor = new Author(dataClean);
    try {
        var author = await Author.findOne({ name: dataClean.name });
        if (author) {
            throw new Error('Author name already exists');
        }
        await newAuthor.save();
        return newAuthor;
    }
    catch (err) {
        throw err;
    }
}

async function update(id, data) {
    allowedProperties = {
        name: true,
    };
    dataClean = cleanProperties(data, allowedProperties);
    try {
        var author = await Author.findById(id);
        if (!author) {
            throw new Error('Author not found');
        }
        author = await Author.findOne({ name: dataClean.name });
        if (author) {
            throw new Error('Author name already exists');
        }
        return await Author.findOneAndUpdate({ _id: id }, dataClean, { new: true });
    } catch (err) {
        throw err;
    }
}


module.exports = { findAll, findBySlug, create, update };