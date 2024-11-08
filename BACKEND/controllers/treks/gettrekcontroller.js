const mongoose = require("mongoose");
const TrekCollection = require("../../models/trekschema");

const gettrekcontroller = async (req, res) => {
    try {
        const { name, location, type, id } = req.params;
        let treks;

        // Combined search for `name`, `location`, `type`, and `id`
        if (name && location && type && id) {
            treks = await TrekCollection.findOne({
                name: { $regex: new RegExp(name, "i") },
                location: { $regex: new RegExp(location, "i") },
                type: { $regex: new RegExp(type, "i") },
                id: parseInt(id), // Convert id to a number
            });
        }
        // Individual searches
        else if (name) {
            treks = await TrekCollection.find({
                name: { $regex: new RegExp(name, "i") },
            });
        }
        else if (location) {
            treks = await TrekCollection.find({
                location: { $regex: new RegExp(location, "i") },
            });
        }
        else if (type) {
            treks = await TrekCollection.find({
                type: { $regex: new RegExp(type, "i") },
            });
        }
        // Random sample
        else if (req.path.includes("/random")) {
            treks = await TrekCollection.aggregate([{ $sample: { size: 16 } }]);
        }
        // Sorted by rating (high to low)
        else if (req.path.includes("/high-low")) {
            treks = await TrekCollection.find().sort({ rating: -1 }).limit(4);
        }
        // Default: Return all treks
        else {
            treks = await TrekCollection.find();
        }

        // Check if treks were found
        if (!treks || (Array.isArray(treks) && treks.length === 0)) {
            return res.status(404).send({ message: "Trek not found" });
        }

        // Send response
        res.status(200).send(treks);
    } catch (error) {
        res.status(504).send({ message: "ERROR FETCHING Treks" });
        console.log(`Error occurred: ${error}`);
    }
};

module.exports = gettrekcontroller;
