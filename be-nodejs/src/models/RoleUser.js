const mongoose = require("mongoose");
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const RoleUserSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: ObjectId,
        ref: "Role",
        required: true
    }
},
    {
        timestamps: true,
        collection: 'RoleUsers'
    }
);

RoleUserSchema.index({ user: 1, role: 1 }, { unique: true });

const RoleUser = mongoose.model("RoleUser", RoleUserSchema);

module.exports = RoleUser;