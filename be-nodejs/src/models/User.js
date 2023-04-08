const mongoose = require("mongoose");
var toJson = require('@meanie/mongoose-to-json');

mongoose.plugin(toJson);

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
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
    avatar: {
        type: String,
        trim: true,
        default: null
    },
    balance: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    email: {
        type: String,
        trim: true,
        maxlength: 256,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    token: {
        type: String,
        trim: true,
        default: null
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isLocked: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true,
        collection: 'Users'
    }
);

UserSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password'];
        delete ret['isAdmin'];
        delete ret['isLocked'];
        return ret
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;