const RoleUser = require("./../models/RoleUser");
const User = require("./../models/User");
const Role = require("./../models/Role");
const { cleanProperties } = require('./../validator/RequestValidate');

async function create(data){
    allowedProperties = {
        user: true,
        role: true,
    }
    dataClean = cleanProperties(data, allowedProperties);
    var newRoleUser = new RoleUser(dataClean);
    try{
        var roleUser = await RoleUser.findOne({ user: dataClean.user, role: dataClean.role });
        if(roleUser){
            throw new Error('RoleUser already exists');
        }
        var user = await User.findById(dataClean.user);
        if(!user){
            throw new Error('User not found');
        }
        var role = await Role.findById(dataClean.role);
        if(!role){
            throw new Error('Role not found');
        }
        await newRoleUser.save();
        return newRoleUser;
    }
    catch(err){
        throw err;
    }
}

async function destroy(id){
    try{
        const roleUser = await RoleUser.findById(id);
        if(!roleUser){
            throw new Error("RoleUser not found");
        }
        return await RoleUser.findByIdAndDelete(id);
    }
    catch(err){
        throw err;
    }
}

module.exports = { create, destroy };