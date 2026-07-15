const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Admin = require('../models/adminModel');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        async (email, password, done) => {
            try {
                const user = await Admin.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'Email not found' });
                }

                const checkPassword = await bcrypt.compare(password, user.password);

                if (!checkPassword) {
                    return done(null, false, { message: 'Invalid Password' });
                }

                return done(null, user);

            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Admin.findById(id);

        if (!user) {
            return done(null, false);
        }

        done(null, user);

    } catch (err) {
        done(err);
    }
});

module.exports = passport;