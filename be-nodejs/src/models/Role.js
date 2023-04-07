const mongoose = require("mongoose");
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const RoleSchema = new Schema({
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
    description: {
        type: String,
        trim: true,
        maxlength: 2048
    }
},
    {
        timestamps: true,
        collection: 'Roles'
    }
);

RoleSchema.path('name').validate(async (value) => {
    const nameCount = await mongoose.models.Role.countDocuments({ name: value });
    return !nameCount;
}, 'Name has already been taken.');

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;