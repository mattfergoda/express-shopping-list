"use strict";

const express = require("express");

const { NotFoundError } = require("./expressError");
let { items } = require("./fakeDb");

const router = new express.Router();

/**Validate that item exists in database, else throw 404 */
function validateItem(req, res, next){
  const matchedItems = items.filter(item => item.name === req.params.name);

  if(matchedItems.length === 0){
    throw new NotFoundError(`${req.params.name} not found`);
  }

  next();
}

/** GET /items: get list of items */
router.get("/", function (req, res) {
	return res.json({items});
});

/** POST /items: add item to list */
router.post("/", function (req, res) {
  const newItem = {
    name: req.body.name,
    price: req.body.price,
  };

  items.push(newItem);

	return res.json({added: newItem});
});

/** GET /items/:name: get particular item */
router.get("/:name", validateItem, function (req, res) {
  const item = items.filter(item => item.name === req.params.name)[0];
	return res.json(item);
});

/** PATCH /items/:name: update a particular item */
router.patch("/:name", validateItem, function (req, res) {
  const item = items.filter(item => item.name === req.params.name)[0];
  item.name = req.body.name || item.name;
  item.price = req.body.price || item.price;

	return res.json({updated: item});
});

/** DELETE /items/:name: delete a particular item */
router.delete("/:name", validateItem, function (req, res) {
  items = items.filter(item => item.name !== req.params.name);

	return res.json({message: "Deleted"});
});

module.exports = router;