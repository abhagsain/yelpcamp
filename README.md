# Yelp Camp 

A Node. js Web Application

## Demo
> See this app in action at [http://abhagsain-camping.herokuapp.com/](http://abhagsain-camping.herokuapp.com/)

**I've added a demo user Ariana** on the login page, so you don't have to sign up to test the functionality.

![website screenshot](https://user-images.githubusercontent.com/36589645/50891598-a3240080-1422-11e9-8865-9c3814db1b47.jpg)

## Installation

Make sure you have these things installed
* [Node](https://nodejs.)
* [MongoDB](https://www.mongodb.com/download-center)
  
  * [MLab](https://mongolab.com) (Alternative to downloading MongoDB locally)
see the [docs](https://docs.mlab.com/)


### You can clone or download this repository.

```
git clone https://github.com/abhagsain/yelpcamp.git
```

after that run command

``` 
npm install
```
this will install all the necessary packages that you need to run the application. 

>I've used [dot.env](https://www.npmjs.com/package/dotenv) to store the environment variable, So you need to create a **.evn** file once you clone or download the repo.

paste below code into that file

```
# if you're using MLAB replace variable with your MLAB url
DATABASEURL = mongodb://localhost:27017/[your_database_name]
```
## Application Feature

* Authentication
  
  * Users can sign up or login using username and password.
  
  * User can not submit campgrounds if they are not logged in.

* Authorization 
 
  * User can only modify campgrounds created by them.


* Basic Functionality

  * Add Name, Image and Description to the campground.

  * Create, Update, Delete the Campground.

  * Add comments to campgrounds.

  * Flash Important messages to warn or gree the users.

  * Responsive Web design.


## Built with 

### Front end

* [Bootstrap 4.0](https://getbootstrap.com)

* [ejs](https://ejs.co/)

### Back End

* [Node. js](https://nodejs.org)

* [Express. js](https://expressjs.com)

* [MongoDB](https://www.mongodb.com/)

* [mLAB](https://mlab.com)

* [mongoose](http://mongoosejs.com/)

* [passport](http://www.passportjs.org/)

* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)

* [express-session](https://github.com/expressjs/session#express-session)

* [method-override](https://github.com/expressjs/method-override#method-override)

* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

* [dotenv](https://www.npmjs.com/package/dotenv)

* [body-parser](https://www.npmjs.com/package/body-parser)

* [connect-mongo](https://www.npmjs.com/package/connect-mongo)

### Text Editor

* [Visual Studio Code](https://code.visualstudio.com/) I'm in love with this :P

* See how to use [Emmet](https://code.visualstudio.com/blogs/2017/08/07/emmet-2.0) in VSCode. This [CheatSheet](https://docs.emmet.io/cheat-sheet/) might be helpful.

>Change default shell in VSCode to [git bash](https://git-scm.com/downloads) if you're using windows and know some Linux commands. Don't know how to do it? [See here](https://stackoverflow.com/questions/44435697/vscode-change-default-terminal)

I'll be adding features as I learn more.

A Big Thanks to [Colt Steele](https://github.com/Colt) for all the knowledge. 
