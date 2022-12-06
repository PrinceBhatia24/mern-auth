const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js")
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/User")
const path = require('path');


dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000



app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfully", user: user })
            }
            else {
                res.send({ message: "Password is invalid" })
            }
        } else {
            res.send({ message: "User Not Registered" })
        }
    })
})
app.post("/register", (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered" })
        } else {
            const user = new User({
                name: name,
                email: email,
                password: password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "Successfully Registered Please Login Now" })
                }
            })
        }
    })

})

//Server production asset

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join("mern-auth/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

app.listen(PORT, console.log(`The Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));  