const Admin = require('../models/adminModel');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const deleteAdminAvatar = (avatar) => {
    if (!avatar) {
        return;
    }

    const imagePath = path.join(__dirname, '..', 'public', avatar.replace(/^\//, ''));

    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
};
module.exports.signupPage = (req, res) => {
    try {
        return res.render('signup');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};
module.exports.registerPage = async (req, res) => {
    try {

        const checkEmail = await Admin.findOne({
            email: req.body.email
        });

        if (checkEmail) {
            console.log("User Already Exists");
            return res.redirect('/signup');
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);

        await Admin.create(req.body);

        console.log("Signup Successfully");

        return res.redirect('/login');

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};
module.exports.loginPage = (req, res) => {
    try {

        return res.render('login');

    } catch (err) {

        console.log(err);
        return res.redirect('back');

    }
};


module.exports.logout = (req, res, next) => {
    req.logout(function (err) {

        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {

            if (err) {
                console.log(err);
                return res.redirect('back');
            }

            res.clearCookie('connect.sid');

            return res.redirect('/login');
        });

    });
};

module.exports.dashboardPage = async (req, res) => {
    try {

        return res.render('dashboard', {
            admin: req.user
        });

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.addAdminPage = (req, res) => {
    try {

        return res.render('add-admin');

    } catch (err) {

        console.log(err);
        return res.redirect('back');

    }
};

module.exports.insertAdmin = async (req, res) => {
    try {

        const checkEmail = await Admin.findOne({
            email: req.body.email
        });

        if (checkEmail) {
            console.log("Email Already Exists");
            return res.redirect('back');
        }

        if (req.file) {
            req.body.avatar = Admin.imagePath + '/' + req.file.filename;
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);

        await Admin.create(req.body);

        console.log("Admin Added Successfully");

        return res.redirect('/view-admin');

    } catch (err) {

        console.log(err);
        return res.redirect('back');

    }
};
module.exports.viewAdminPage = async (req, res) => {
    try {

        const adminData = await Admin.find();

        return res.render('view-admin', {
            adminData
        });

    } catch (err) {

        console.log(err);
        return res.redirect('back');

    }
};

module.exports.editAdminPage = async (req, res) => {
    try {

        const id = req.params.id;

        const admin = await Admin.findById(id);

        if (!admin) {
            console.log("Admin Not Found");
            return res.redirect('/view-admin');
        }

        return res.render('edit-admin', {
            admin
        });

    } catch (err) {

        console.log(err);
        return res.redirect('back');

    }
};

module.exports.updateAdmin = async (req, res) => {
    try {

        const id = req.params.id;

        const oldAdmin = await Admin.findById(id);

        if (!oldAdmin) {
            console.log("Admin Not Found");
            return res.redirect('/view-admin');
        }

        const checkEmail = await Admin.findOne({
            email: req.body.email,
            _id: { $ne: id }
        });

        if (checkEmail) {
            console.log("Email Already Exists");
            return res.redirect('back');
        }

        let avatar = oldAdmin.avatar;

        if (req.file) {

            if (oldAdmin.avatar) {
                deleteAdminAvatar(oldAdmin.avatar);
            }

            avatar = Admin.imagePath + '/' + req.file.filename;
        }

        await Admin.findByIdAndUpdate(id, {
            fname: req.body.fname,
            lname: req.body.lname,
            uname: req.body.uname,
            email: req.body.email,
            mobile: req.body.mobile,
            dob: req.body.dob,
            gender: req.body.gender,
            hobby: req.body.hobby,
            city: req.body.city,
            role: req.body.role,
            address: req.body.address,
            avatar: avatar
        });

        console.log("Admin Updated Successfully");

        return res.redirect('/view-admin');

    } catch (err) {

        console.log(err);
        return res.redirect('back');

    }
};


module.exports.deleteAdmin = async (req, res) => {
    try {

        const id = req.params.id;

        const admin = await Admin.findById(id);

        if (!admin) {
            console.log("Admin Not Found");
            return res.redirect('/view-admin');
        }

        if (admin.avatar) {
            deleteAdminAvatar(admin.avatar);
        }

        await Admin.findByIdAndDelete(id);

        console.log("Admin Deleted Successfully");

        return res.redirect('/view-admin');

    } catch (err) {

        console.log(err);
        return res.redirect('back');

    }
};

module.exports.editProfilePage = async (req, res) => {
    try {

        const admin = await Admin.findById(req.user._id);

        if (!admin) {
            return res.redirect('/login');
        }

        return res.render('edit-profile', {
            admin
        });

    } catch (err) {

        console.log(err);
        return res.redirect('back');

    }
};

module.exports.updateProfile = async (req, res) => {
    try {

        const oldAdmin = await Admin.findById(req.user._id);

        if (!oldAdmin) {
            console.log("Admin Not Found");
            return res.redirect('/login');
        }

        const checkEmail = await Admin.findOne({
            email: req.body.email,
            _id: { $ne: req.user._id }
        });

        if (checkEmail) {
            console.log("Email Already Exists");
            return res.redirect('back');
        }

        let avatar = oldAdmin.avatar;

        if (req.file) {

            if (oldAdmin.avatar) {
                deleteAdminAvatar(oldAdmin.avatar);
            }

            avatar = Admin.imagePath + '/' + req.file.filename;
        }

        await Admin.findByIdAndUpdate(req.user._id, {
            fname: req.body.fname,
            lname: req.body.lname,
            uname: req.body.uname,
            email: req.body.email,
            dob: req.body.dob,
            mobile: req.body.mobile,
            gender: req.body.gender,
            hobby: req.body.hobby,
            city: req.body.city,
            role: req.body.role,
            address: req.body.address,
            bio: req.body.bio,
            avatar: avatar
        });

        console.log("Profile Updated Successfully");

        return res.redirect('/');

    } catch (err) {

        console.log(err);
        return res.redirect('back');

    }
};