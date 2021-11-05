const router = require("express").Router();
const Customer = require("../models/eventModel");
const auth = require("../middleware/auth");
// creating events
router.post("/", auth, async (req, res) => {
    try {
        const { name, time, location, title, description} = req.body;

        const newCustomer = new Customer({
            name, time, location, title, description
        });

        //validation

        if (!time || !location || !title || !description) {
            return res.status(400).json({erroerMessage: "you need to enter all fields."});
        }

        const savedCustomer = await newCustomer.save();

        res.json(savedCustomer);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
//getting events
router.get("/", auth, async (req,res) => {
    try {

        const customers = await Customer.find();
        res.json(customers);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})


module.exports = router;