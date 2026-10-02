const express = require("express");
const { createOrder } = require("../controllers/orderControllers");

const router = express.Router();
router.post("/", createOrder);

module.exports = router;
