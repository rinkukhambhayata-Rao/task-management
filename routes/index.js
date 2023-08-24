const express = require("express");

const router = express.Router();
const TaskRoutes = require("./task");
const UserRoutes = require("./user");

router.use('/task', TaskRoutes);
router.use('/user', UserRoutes);

module.exports = router;