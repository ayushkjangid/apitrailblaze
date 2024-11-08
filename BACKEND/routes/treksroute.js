const express = require("express");
const gettrekcontroller = require("../controllers/treks/gettrekcontroller");
const { get } = require("mongoose");
const router = express.Router();

router.get("/", gettrekcontroller);
// Add this route before other specific ones
router.get("/:name/:location/:type/:id", gettrekcontroller);


router.get("/type/:type",gettrekcontroller);

router.get("/location/:location",gettrekcontroller);

router.get("/name/:name",gettrekcontroller);

router.get("/id/:id", gettrekcontroller);

router.get("/random", gettrekcontroller);

router.get("/top-rated", gettrekcontroller);

router.get("/low-high", gettrekcontroller);

router.get("/high-low", gettrekcontroller);

router.get("/type/high-low", gettrekcontroller);
module.exports = router;
