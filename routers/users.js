const express = require('express');
const User = require('../models/user');
const Campgrounds = require('../models/campgrounds');

const router = express.Router();
router.get('/profile/:id', (req, res) => {
    // Find the User in the database and then show his profile and created campgrounds by him.
    User.findById(req.params.id, (err, foundUser) => {
        if (!err) {
            // eslint-disable-next-line no-underscore-dangle
            Campgrounds.find().where('createdBy.id').equals(foundUser._id)
                .exec((_err, userCampgrounds) => {
                    if (!_err) {
                        console.log(userCampgrounds);
                        res.render('./users/show', {
                            userCampgrounds,
                            foundUser
                        });
                    } else {
                        console.log(`No campgrounds found by the user ${_err}`);
                    }
                });
        } else {
            res.render('notFound');
        }
    });
});
router.post('/profile/:id', (req, res) => {
    console.log("​req.params.id", req.params.id);
    req.method = 'get';
    res.send('success');
})
module.exports = router;