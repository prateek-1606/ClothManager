const express = require('express');
const router = express.Router();

const User = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/signup', (req, res) => {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists with that email" })
            }
            bcrypt.hash(password, 12)
                .then((hashedpassword) => {
                    const user = new User({
                        name,
                        email,
                        role,
                        password: hashedpassword,
                    })
                    user.save()
                        .then(() => {
                            res.json('saved successfully')
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        })
})

router.post('/signin', (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please add email or password" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then((match) => {
                    if (match) {
                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET)
                        const { _id, name, email, role } = savedUser
                        res.json({ token, user: { _id, name, email } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid password" })
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        })
})

module.exports = router