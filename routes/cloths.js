const express = require('express')
const router = express.Router()
const Cloth = require('../models/cloths')
const Auth = require('../middleware/auth')

router.get('/', Auth, (req, res) => {
    Cloth.find({ Ownername: req.user.name })
        .then((cloths) => {
            res.json(cloths)
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/shared', (req, res) => {
    Cloth.find()
        .then((cloths) => {
            const SharedCloths = cloths.filter((cloth) => cloth.isShared === true)
            res.json(SharedCloths)
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:id', Auth, (req, res) => {
    const id = req.params.id.trim();
    Cloth.findById({ _id: id })
        .then((cloth) => {
            if (cloth.Ownername === req.user.name) {
                res.json(cloth);
            }
            else {
                res.json('You are not allowed to do')
            }
        })
        .catch((error) => {
            console.log(error);
        })
})

router.post('/', Auth, (req, res) => {
    const isShared = false
    console.log(req.user.name)
    const Ownername = req.user.name
    const { name, type, Cost, pic, description, Quantity } = req.body
    if (!name || !Ownername || !Cost || !pic || !description || !Quantity) {
        return res.status(422).json({ error: "Plase add all the fields" })
    }
    const cloth = new Cloth({
        name,
        type,
        description,
        Quantity,
        Cost,
        pic,
        Ownername,
        isShared
    })
    cloth.save().then(result => {
        res.json({ cloth: result })
    })
        .catch(err => {
            console.log(err)
        })
})

router.put('/:id', Auth, (req, res) => {
    const id = req.params.id.trim()
    const Ownername = req.user.name
    const { name, type, Cost, pic, description, Quantity } = req.body
    if (!name || !Ownername || !Cost || !pic || !description || !Quantity) {
        return res.status(422).json({ error: "Plase add all the fields" })
    }
    Cloth.findById({ _id: id })
        .then((cloth) => {
            if (cloth.Ownername === req.user.name) {
                Cloth.findOneAndUpdate({ _id: id }, {
                    "$set": {
                        "name": name,
                        "type": type,
                        "Ownername": Ownername,
                        "cost": Cost,
                        "pic": pic,
                        "description": description,
                        "Quantity": Quantity,
                    }
                }).then(() => {
                    res.json('Cloth Updated')
                }).catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                })
            }
            else {
                res.json('You are not allowed to do')
            }
        })
})

router.delete('/:id', Auth, (req, res) => {
    const id = req.params.id.trim()
    Cloth.findById({ _id: id })
        .then((cloth) => {
            if (cloth.Ownername === req.user.name) {
                Cloth.findOneAndDelete({ _id: id })
                    .then(() => {
                        res.json('Cloth Deleted')
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json(err);
                    })
            }
            else {
                res.json('You are not allowed to do')
            }
        })
})

module.exports = router

