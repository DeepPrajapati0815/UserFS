const express = require("express");
const router = express.Router();

router.use("/user", require("./userRote"));
router.use("/auth", require("./authRoute"));

module.exports = router;
