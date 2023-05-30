const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send({ message : 'you reached /employees endpoint'}) 
})

module.exports = router;