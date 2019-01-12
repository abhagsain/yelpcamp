/* eslint-disable no-param-reassign */
const express = require("express");
const campground = require("../models/campgrounds");
const middleWare = require("../middleware");

const router = express.Router();
router.get("/", (req, res) => {
  res.render("campgrounds/homepage");
});
router.get("/campgrounds", (req, res) => {
  try {
    async function getAllCampgrounds() {
      return await campground.find({});
    }
    async function renderCampgrounds() {
      const campgrounds = await getAllCampgrounds();
      res.render("campgrounds/index", {
        campgrounds: campgrounds,
        user: req.user
      });
    }

    renderCampgrounds();
  } catch (err) {
    req.flash("error", err);
    res.redirect("/");
  }
});
router.post("/campgrounds", (req, res) => {
  async function createCampground() {
    return await campground.create(req.body.obj);
  }
  createCampground()
    .then(newlyCreatedCampground => {
      newlyCreatedCampground.createdBy.id = req.user._id;
      newlyCreatedCampground.createdBy.username = req.user.username;
      newlyCreatedCampground.save();
      req.flash("success", "Successfully created a campground");
      res.redirect("/campgrounds");
    })
    .catch(err => {
      req.flash("error", "There was some error in creating the campground");
    });
  // campground.create(req.body.obj, (err, result) => {
  //     if (!err) {
  //         // eslint-disable-next-line no-param-reassign
  //         // eslint-disable-next-line no-underscore-dangle
  //         result.createdBy.id = req.user._id;
  //         result.createdBy.username = req.user.username;
  //         result.save();
  //         req.flash("success", "Successfully created a campground");
  //         res.redirect("/campgrounds");
  //     } else {
  //         req.flash("error", "There was some error. Please try later");
  //     }
  // });
  // Redirect User to the campgrounds page
});
router.get("/campgrounds/new", middleWare.isLoggedIn, (req, res) => {
  res.render("new");
});
router.get("/campgrounds/:id/edit", middleWare.checkOwnership, (req, res) => {
  //  content using Promises
  try {
    async function findUser() {
      return await campground.findById(req.params.id);
    }
    findUser()
      .then(result => {
        console.log("Found the user");
        res.render("campgrounds/update", {
          camp: result
        });
        req.flash("error", "Oops! Campground not found");
      })
      .catch(err => {
        req.flash("error", err);
      });
  } catch (err) {
    req.flash("error", err);
  }

  // ------Reading User using callbacks------

  /*
    campground.findById(req.params.id, (err, result) => {
        if (!err) {
            res.render("campgrounds/update", {
                camp: result
            });
        } else {
            req.flash("error", "Oops! Campground not found");
        }
    });
    */
});
// PUT REQUEST TO UPDATE THE CAMPGROUNDS INFO
router.put("/campgrounds/:id", middleWare.checkOwnership, (req, res) => {
  try {
    // Using Promises
    async function updateCampground() {
      return await campground.findByIdAndUpdate(req.params.id, req.body.obj);
    }

    updateCampground()
      .then(c => {
        req.flash("success", "Updated");
        res.redirect(`/campgrounds/${req.params.id}`);
      })
      .catch(err => {
        req.flash("error", "Could not update campground ");
        res.redirect(`/campgrounds/${req.params.id}`);
      });
  } catch (err) {
    req.flash("error", "Could not update campground ");
  }

  //-----------------Using Callback------------------
  /*
    campground.findByIdAndUpdate(req.params.id, req.body.obj, (err, result) => {
        if (!err) {
            req.flash("success", "Updated!");
            res.redirect(`/campgrounds/${req.params.id}`);
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
    */
});
// eslint-disable-next-line no-unused-vars
router.delete("/campgrounds/:id", middleWare.checkOwnership, (req, _res) => {
  // Find the campground with the ID -> Delete it from the database
  // Redirect user to /campgrounds page
  // eslint-disable-next-line no-shadow

  async function deleteCampground() {
    return await campground.findByIdAndDelete(req.params.id);
  }

  deleteCampground().then(result => {
    req.flash("success", "Successfully deleted a campground");
    _res.redirect("/campgrounds");
  });

  // ------------------------Callbacks---------------------
  /*
  campground.findByIdAndDelete(req.params.id, err => {
    if (!err) {
      req.flash("Success", "Successfully deleted a campground");
      _res.redirect("/campgrounds");
    }
  });
  */
});

router.get("/campgrounds/:id", (req, res) => {
  // First of all find the Name, Image and Description of the campground that is clicked
  //   Using Promises
  try {
    async function getCampground() {
      return await campground
        .findById(req.params.id)
        .populate("comment")
        .exec();
    }
    getCampground()
      .then(camp => {
        console.log("Called");
        res.render("campgrounds/show", {
          camp,
          user: req.user
        });
      })
      .catch(err => {
        res.render("notFound");
      });
  } catch (err) {
    res.render("notFound");
  }

  //   Using Callbacks
  /*
  campground
    .findById(req.params.id)
    .populate("comment")
    .exec((err, camp) => {
      if (err) {
        res.render("notFound");
      } else {
        res.render("campgrounds/show", {
          camp,
          user: req.user
        });
      }
    });
    */
  // render the show page pass the data to that page
});
module.exports = router;
