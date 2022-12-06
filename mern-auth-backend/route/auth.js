// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const { check, validationResult } = require("express-validator");
// const user = require("../models/user");
// const user = require("../models/user");
// const user = require("../models/user");


// var jwtSecret = "mySecretToken"

// //@ Route Post  / users
// //@Register the User
// // Access To Public 

// router.post("/", [
//     check("name", "Name is Required").not().isEmpty(),
//     check("email", "please include a valid Email").isEmail(),
//     check("password", "please Enter  Password with six or more Character").isLength({ min: 6 })
// ],

//     async (req, res) => {
//         const error = validationResult(req)
//         if (!error.isEmpty()) {
//             return res.status(400).json({ error: error.array() });
//         }
//         const { name, email, password } = req.body;
//         try {
//             let user = await user.findOne({ email });
//             if (user) {
//                 res.status(400).json({ error: [{ msg: "User Already Exists" }] })
//             }
//             user = new user({
//                 name,
//                 email,
//                 password,
//             })
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(password, salt)
//             await user.save();

//             const payload = {
//                 user: {
//                     id: user.id,
//                 }
//             }
//             jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token => {
//                 if (error) throw err;
//                 res.json({ token });
//             }))
//         } catch (error) {
//             console.error(error.message)
//             res.status(500).send("internal server error")
//         }
//     }
// )
// router.get("/auth", async (req, res) => {
//     try {
//         const user = await user.findById(req.user.id).select("-password")
//         res.json(user)
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send("internal server error")
//     }
// })
// module.exports = router;