const campground = require('../models/campgrounds');

const middleWare = {};
middleWare.checkOwnership = function checkOwnership(req, res, next) {
    // Check if the user currently logged in?
    if (req.isAuthenticated()) {
        // Check if the user owns the campgrounds
        campground.findById(req.params.id, (err, camp) => {
            // eslint-disable-next-line no-underscore-dangle
            if (!err) {
                // eslint-disable-next-line no-underscore-dangle
                if (camp.createdBy.id.equals(req.user._id)) {
                    // Then the currently logged in user has the ownership 
                    next();
                } else {
                    req.flash('error', 'You do not have the required permission');
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            } else {
                req.flash('error', 'Oops! Campground not found');
            }
        });
    } else {
        req.flash('error', 'You must be logged in first!');
        res.redirect(`/campgrounds/${req.params.id}`);
    }
};
middleWare.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Middleware Login called');
    req.flash('error', 'You must be logged in first!');
    res.redirect('/login');
};
module.exports = middleWare;
