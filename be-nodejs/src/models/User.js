const mongoose = require("mongoose");
var toJson = require('@meanie/mongoose-to-json'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

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
    avatar: {
        type: String,
        trim: true
    },
    balance: {
        type: Number,
        required: true,
        min: 0,
        default: 0
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
        collection: 'Authors'
    }
);

     
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.path('email').validate(async (value) => {
    const emailCount = await mongoose.models.User.countDocuments({ email: value });
    return !emailCount;
}, 'Email has already been taken.');

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;