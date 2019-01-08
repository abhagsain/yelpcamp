const express = require('express');

const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
// ----------------------- REGISTER USER ------------------------------------

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username
    });
    // eslint-disable-next-line no-unused-vars
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            const e = err;
            req.flash('error', e);
            console.log(typeof err);
            console.log(`${e}`);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/login');
        });
    });
});

// ---------------------------------------------------LOGIN USER-------------------------------
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
    failureFlash: {
        type: 'error',
        message: 'Invalid username or password.'
    },
    successFlash: {
        type: 'success',
        message: 'Successfully logged in'
    }
    // eslint-disable-next-line no-unused-vars
}), (req, res) => {

});

// Route to logout the User
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'Logged out!');
    res.redirect('/campgrounds');
});
module.exports = router;
