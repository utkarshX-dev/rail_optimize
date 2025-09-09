const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {login, register, adminLogin, getUsers} = require('../controllers/userController.js');
router.post('/login', wrapAsync(login));
router.post('/register', wrapAsync(register));
router.post('/admin/login', wrapAsync(adminLogin));
router.get('/admin/users', wrapAsync(getUsers));
module.exports = router;