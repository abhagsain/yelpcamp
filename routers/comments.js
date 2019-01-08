/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// ---------------------- Campgrounds Routes
const express = require('express');
const campground = require('../models/campgrounds');
const Comment = require('../models/comments');

const router = express.Router();
router.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
    const id = req.params.id;
    campground.findById(id, (err, page) => {
        // Get the
        if (err) {
            // res.redirect('/campgrounds/' + id);
            console.log('Error');
        } else {
            res.render('./comments/new', {
                camp: page
            });
        }
    });
});
// Post route for comments
router.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
    // Associate the comment with User
    Comment.create(req.body.comment, (err, comment) => {
        // Find the post in the DB
        campground.findById(req.params.id, (_err, camp) => {
            // We need to add the comment
            //to the particular post with the given ID
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            camp.comment.push(comment); // Added the comment
            // It's only gonna take the ID of the comment
            camp.save(); // save the camp
            // Redirect the user to that post where he commented
            res.redirect(`/campgrounds/${req.params.id}`);
        });
    });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Couldn\'t authenticate the User');
    res.redirect('/login');
}
module.exports = router;
