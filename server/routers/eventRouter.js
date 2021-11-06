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
        // can find specific events by adding to .find()

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});


router.put("/:id", async (req, res) => {
    try {
        const {name, time, location, title, description} = req.body;
        const customerId = req.params.id;

        //validation

        if (!time || !location || !title || !description) {
            return res.status(400).json({erroerMessage: "you need to enter all fields."});
        }

        if (!customerId)
            return res.status(400).json({errorMessage: "customer Id not given1."});

        const orginalCustomer = await Customer.findById(customerId);
        if (!orginalCustomer)
            return res.status(400).json({errorMessage: "No customer with this ID was found "});
        
        orginalCustomer.name = name;
        orginalCustomer.time = time;
        orginalCustomer.locatoin = location;
        orginalCustomer.description = description;

        const savedCutomer = await orginalCustomer.save();
        res.json(savedCutomer);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})


// delete event

router.delete("/:id", async (req, res) => {
    try {

        const customerId = req.params.id;
        
        

        //validation
        if (!customerId)
            return res.status(400).json({erroerMessage: "customerId not given"});

        const existingCustomer = await Customer.findById(customerId);
        if (!existingCustomer)
            return res.status(400).json({erroerMessage: "No customer with this ID was found"});

        await existingCustomer.delete();

        res.json(existingCustomer);

    } catch(err) {
        res.status(500).send();
    }
});


module.exports = router;