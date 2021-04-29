const express = require('express')
const Cloth = require('../models/cloths')
const router = express.Router()
const Auth = require('../middleware/auth')

router.put('/:id', Auth, (req, res) => {
    const Ownername = req.user.name
    const id = req.params.id.trim()
    const { name, type, Cost, pic, description, Quantity } = req.body
    if (!name || !Ownername || !Cost || !pic || !description || !Quantity) {
        return res.status(422).json({ error: "Plase add all the fields" })
    }
    Cloth.findOneAndUpdate({ _id: id }, {
        "$set": {
            "name": name,
            "type": type,
            "Ownername": Ownername,
            "cost": Cost,
            "pic": pic,
            "description": description,
            "Quantity": Quantity,
            "isShared": true
        }
    }).then(() => {
        res.json('Cloth Shared')
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;