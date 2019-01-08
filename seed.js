/* eslint-disable no-shadow */
const campground = require('./models/campgrounds');
const comment = require('./models/comments');

const campgrounds = [{
    name: 'Modulo Acksin',
    url: 'https://images.unsplash.com/photo-1525811902-f2342640856e',
    description: 'Awesome place with wilderness'
}, {
    name: 'Tsomoriri Camp',
    url: 'https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9',
    description: 'Sernity and amidst the beauty of nature. This place is picturesque'
}, {
    name: 'Nameri Eco Camp',
    url: 'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?',
    description: 'Awesome place for camping'
}, {
    name: 'Rishikesh Valley',
    url: 'https://images.unsplash.com/photo-1515444744559-7be63e1600de',
    description: 'Great location to relax and have fun with friends.'
}];
// We need to add some sample data into the database so we have something to work with

function addSampleData() {
    // Delete everything from the DB 
    campground.remove({}, (err) => {
        // if (err) {
        //     console.log(`There was some error in deleting the data ${err}`);
        // } else {
        //     console.log('Deleted everything from the database');
        //     comment.remove({}, (err) => {
        //         if (!err) {
        //             console.log('Removed all the comments');
        //             campgrounds.forEach(dataToBeCreated => {
        //                 // Add data from the array to the database
        //                 campground.create(dataToBeCreated, (err, campground) => {
        //                     if (!err) {
        //                         comment.create({
        //                             text: 'Wonderful place',
        //                             author: 'Vito Scaletta'
        //                         }, (err, comment) => {
        //                             if (err) {
        //                                 console.log(`There was some error ${err}`);
        //                             } else {
        //                                 // console.log(comment);
        //                                 campground.comment.push(comment);
        //                                 campground.save();
        //                             }
        //                         });
        //                     } else {
        //                         console.log('There\'s an error in creating the data');
        //                     }
        //                 });
        //             });
        //         }
        //     });
        // }
    });
}
module.exports = addSampleData;
