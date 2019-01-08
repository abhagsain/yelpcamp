/* eslint-disable camelcase */
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/user');
const localStrategy = require('passport-local');
const authRoutes = require('./routers/auth');
const campgroundRoutes = require('./routers/campgrounds');
const commentRoutes = require('./routers/comments');
const connectFlash = require('connect-flash');
const methodOverride = require('method-override');
const session = require('express-session');
// mongoose.connect(
//   'mongodb://localhost:27017/yelp_camp', {
//     useNewUrlParser: true
//   }
// );
mongoose.connect(
  'mongodb://abhagsain:password13@ds227243.mlab.com:27243/abhagsain_camping', {
    useNewUrlParser: true
  }
);
app.use(connectFlash());
// -----------------------------Express-session----------------------
const MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: 'something special',
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride('_method'));
// ------------------------------Passport Session--------------------
app.use(passport.initialize());
app.use(passport.session());
const body_parser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  res.locals.user = req.user;
  // eslint-disable-next-line no-param-reassign
  res.locals.error = req.flash('error');
  // eslint-disable-next-line no-param-reassign
  res.locals.success = req.flash('success');
  // eslint-disable-next-line no-param-reassign
  res.locals.github = 'https://github.com/abhagsain';
  next();
});
// ----------------------------- Passport Config --------------------------------
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ------------------------- Passport Config done! -----------------------------
app.use(
  body_parser.urlencoded({
    extended: true
  })
);

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
app.get('*', (req, res) => {
  res.render('notfound');
});
app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log('Server started!');
});
