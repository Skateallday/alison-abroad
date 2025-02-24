const router = require('express').Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/register').post((request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        username: request.body.username,
        password: hashedPassword,
      });
      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          const alertMessage = `Thanks you for registering ${request.body.username}, you can now login`;
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
          console.log(alertMessage);
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          const alertMessage = "An error has triggered, please try again. If the issue keeps happening contact admin";
          response.status(500).send({
            message: "Error creating user",
            error,
          });
          console.log(alertMessage);
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      const alertMessage = "An error has triggered with the password hashing, please try again. If the issue keeps happening contact admin";
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
      console.log(alertMessage);
    });

});
router.route("/login").post((request, response) => {
  // check if email exists
  User.findOne({ username: request.body.username })
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt.compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            response.status(400).send({
              message: "Passwords do not match",
              error: new Error("Passwords do not match"),
            });
          }

          // create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userName: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
                    // set JWT as an HTTP-only cookie with secure and SameSite attributes
          response.cookie('jwtToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
            sameSite: 'Strict', // Prevent CSRF attacks
            maxAge: 3600000, // 1 hour expiration
            
          });
          // return success response
          response.status(200).send({
            message: "Login Successful",
            username: user.username,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords do not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Username not found",
        e,
      });
    });
});

module.exports = router;