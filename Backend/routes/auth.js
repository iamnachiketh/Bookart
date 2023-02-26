const express = require('express');

const router = express.Router();
const {register,login} = require('../controllers/auth'); 

router.post('/create',register);
router.get('/login',login);
module.exports = router;