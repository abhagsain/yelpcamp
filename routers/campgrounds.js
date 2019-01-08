/* eslint-disable no-param-reassign */
const express = require('express');
const campground = require('../models/campgrounds');
const middleWare = require('../middleware');

const router = express.Router();
router.get('/', (req, res) => {
    res.render('campgrounds/homepage');
});
router.get('/campgrounds', (req, res) => {
    campground.find({}, (err, result) => {
        res.render('campgrounds/index', {
            campgrounds: result,
            user: req.user
        });
    });
});
router.post('/campgrounds', (req, res) => {
    campground.create(req.body.obj, (err, result) => {
        if (!err) {
            // eslint-disable-next-line no-param-reassign
            // eslint-disable-next-line no-underscore-dangle
            result.createdBy.id = req.user._id;
            result.createdBy.username = req.user.username;
            result.save();
            req.flash('success', 'Successfully created a campground');
            res.redirect('/campgrounds');
        } else {
            req.flash('error', 'There was some error. Please try later');
        }
    });
    // Redirect User to the campgrounds page
});
router.get('/campgrounds/new', middleWare.isLoggedIn, (req, res) => {
    res.render('new');
});
router.get('/campgrounds/:id/edit', middleWare.checkOwnership, (req, res) => {
    campground.findById(req.params.id, (err, result) => {
        if (!err) {
            res.render('campgrounds/update', {
                camp: result,
            });
        } else {
            req.flash('error', 'Oops! Campground not found');
        }
    });
});
// PUT REQUEST TO UPDATE THE CAMPGROUNDS INFO
router.put('/campgrounds/:id', middleWare.checkOwnership, (req, res) => {
    // eslint-disable-next-line no-unused-vars
    campground.findByIdAndUpdate(req.params.id, req.body.obj, (err, result) => {
        if (!err) {
            req.flash('success', 'Updated!');
            res.redirect(`/campgrounds/${req.params.id}`);
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});
// eslint-disable-next-line no-unused-vars
router.delete('/campgrounds/:id', middleWare.checkOwnership, (req, _res) => {
    // Find the campground with the ID -> Delete it from the database 
    // Redirect user to /campgrounds page
    // eslint-disable-next-line no-shadow
    campground.findByIdAndDelete(req.params.id, (err) => {
        if (!err) {
            req.flash('Success', 'Successfully deleted a campground');
            _res.redirect('/campgrounds');
        }
    });
    // render the show page pass the data to that page
});

router.get('/campgrounds/:id', (req, res) => {
    // First of all find the Name, Image and Description of the campground that is clicked
    campground
        .findById(req.params.id)
        .populate('comment')
        .exec((err, camp) => {
            if (err) {
                res.render('notFound');
            } else {
                res.render('campgrounds/show', {
                    camp,
                    user: req.user,
                });
            }
        });
    // render the show page pass the data to that page
});
module.exports = router;
