import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import User from '../models/user.model.js';

const router = Router();

const generalLimiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 5,
  message: 'You have exceeded the 5 requests in 15 minutes limit!'
});


router.route('/').get(generalLimiter, (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/register").get(generalLimiter, (req, res) => {
  res.json({ message: 'Loaded' })
})

router.route('/register').post(generalLimiter, (request, response) => {
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

router.route("/login").get(generalLimiter, (req, res) => {
  console.log('loaded')
  res.json({ message: 'Loaded' })
})

router.route("/login").post(generalLimiter, async (request, response) => {
  try {
    const user = await User.findOne({ username: { $eq: request.body.username } });

    if (!user) {
      return response.status(400).send({ message: "Invalid username or password" });
    }

    const passwordCheck = await bcrypt.compare(request.body.password, user.password);

    if (!passwordCheck) {
      return response.status(400).send({ message: "Invalid username or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set JWT as an HTTP-only cookie with security attributes
    response.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    return response.status(200).send({
      message: "Login Successful",
      username: user.username,
      token,
    });

  } catch (error) {
    console.error("Login error details:", error);
    console.error("Error stack:", error.stack);
    return response.status(500).send({
      message: "An error occurred during login",
      error: error.message,
    });
  }
});


export default router;