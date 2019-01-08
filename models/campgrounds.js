const mongoose = require('mongoose');

const campgroundsSchema = mongoose.Schema({
    name: String,
    url: String,
    description: String,
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    createdBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});
module.exports = mongoose.model('campground', campgroundsSchema);
