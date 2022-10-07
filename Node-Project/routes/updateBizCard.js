const express = require("express");
const joi = require("joi");
const _ = require("lodash");
const auth = require("../middlewares/auth");
const Card = require("../models/Card");
const router = express.Router();

const cardSchema = joi.object({
    name: joi.string().required().min(2),
    description: joi.string().required().min(2).max(255),
    address: joi.string().required().min(2),
    image: joi.string().required().min(2),
    phone: joi.string().required().min(10),
});

// update card user
router.put("/:id", auth, async (req, res) => {
  try {
     // joi validation:
        const { error } = cardSchema.validate(req.body);
        if (error) return res.status(400).send("" + error);

     // search if card exists
        let card = await Card.findOne({cardSchema: req.params._Id});
        if (!card) return res.status(400).send("card not found");

    // update biz card
        card = await Card.updateOne(
            { _Id: req.params._Id },
            req.body,
            {new: true}
            );
        res.status(200).send(card);
  } catch (error) {
     res.status(400).send("" + error);
  }
});


module.exports = router;