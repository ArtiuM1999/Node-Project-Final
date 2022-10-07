const express = require("express");
const auth = require("../middlewares/auth");
const Card = require("../models/Card");
const router = express.Router();


router.delete("/:id",auth, async (req, res) =>{
    try {
        // search if product exists
        let card = await Card.findOneAndRemove({id: req.params.id})
        if (!card) return res.status(400).send("card not found");

        // Delete product
        res.status(200).send("card deleted succesfuly")
    } catch(err){
        res.status(400).send("Error in Deleting card");
    };
});


module.exports = router;