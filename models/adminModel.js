const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const imagePath = '/assets/images/avtar/admins';

const adminSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        uname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        dob: {
            type: Date
        },
        mobile: {
            type: Number
        },
        gender: {
            type: String
        },
        hobby: [{
            type: String
        }],
        city: {
            type: String
        },
        role: {
            type: String
        },
        address: {
            type: String
        },
        avatar: {
            type: String
        },
        bio: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', imagePath));
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname +
                '-' +
                Date.now() +
                path.extname(file.originalname)
        );
    }
});

adminSchema.statics.uploadImage = multer({
    storage: storage
}).single('avatar');

adminSchema.statics.imagePath = imagePath;

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;