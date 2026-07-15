const express = require('express');
const route = express.Router();

const passport = require('passport');

const adminController = require('../controller/adminController');
const Admin = require('../models/adminModel');
const auth = require('../config/auth');

route.get('/', auth.checkAuth, adminController.dashboardPage);

route.get('/signup', auth.checkLogin, adminController.signupPage);
route.post('/register', adminController.registerPage);

route.get('/login', auth.checkLogin, adminController.loginPage);

route.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

route.get('/logout', auth.checkAuth, adminController.logout);

route.get('/add-admin', auth.checkAuth, adminController.addAdminPage);

route.post(
    '/add-admin',
    auth.checkAuth,
    Admin.uploadImage,
    adminController.insertAdmin
);

route.get('/view-admin', auth.checkAuth, adminController.viewAdminPage);

route.get('/edit-admin/:id', auth.checkAuth, adminController.editAdminPage);

route.post(
    '/update-admin/:id',
    auth.checkAuth,
    Admin.uploadImage,
    adminController.updateAdmin
);

route.get('/delete-admin/:id', auth.checkAuth, adminController.deleteAdmin);

route.get('/edit-profile', auth.checkAuth, adminController.editProfilePage);

route.post(
    '/update-profile',
    auth.checkAuth,
    Admin.uploadImage,
    adminController.updateProfile
);

module.exports = route;