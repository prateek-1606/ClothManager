const express = require('express')
const moongose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors());
app.use(express.json());
const PORT = 5000
const URL = process.env.MONGOURI

app.get('/', (req, res) => {
    res.send('Heloo Browsrere')
})
app.use('/cloths', require('./routes/cloths'))
app.use(require('./routes/users'))
app.use('/share', require('./routes/share'))

moongose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server Running on Port:${PORT}`)
    }))
    .catch((error) => {
        console.log(error);
    })
