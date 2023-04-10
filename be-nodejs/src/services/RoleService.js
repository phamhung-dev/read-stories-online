const Role = require("./../models/Role");
const { cleanProperties } = require('./../validator/RequestValidate');



async function findAll(){
    try {
        return await Role.find({});
    }
    catch (err) {
        throw err;
    }
}

async function findById(id){
    try{
        return await Role.find({_id:id}).populate();
    }
    catch(err){
        throw err;
    }
}

async function create(data){
    allowedProperties={
        name : true,
        description : true,
    };
    dataClean = cleanProperties(data, allowedProperties);

    try {
        var newRole = new Role(dataClean);
        await newRole.save();
        return newRole;
    }
    catch (err) {
        throw err;
    }
}

async function update(id, data){
    allowedProperties={
        name : true,
        description : true,
    };
    dataClean = cleanProperties(data, allowedProperties);

    try {
        role = await Role.findOneAndUpdate({_id: id}, dataClean, {new: true});
        if (!role) {
            throw new Error("Role not found");
        }
        role.name = dataClean.name;
        role.description = dataClean.description;
        return role;
    }
    catch (err) {
        throw err;
    }
}

async function destroy(id){
    try {
        var role = await Role.findById(id);
        if (!role) {
            throw new Error("Role not found");
        }
        await role.remove();
        return role;
    }
    catch (err) {
        throw err;
    }
}

module.exports = { findAll, findById, create, update, destroy };