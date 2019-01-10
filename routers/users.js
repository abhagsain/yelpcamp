const express = require('express');

const router = express.Router();
router.get('/profile/:id', (req, res) => {
    res.send('This is an users page');
});
module.exports = router;
