"use strict";

const express = require("express");

const items = require("./fakeDb");
const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res) {
	return res.json(items);
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
router.get("/:name", function (req, res) {
  const item = items.filter(item => item.name === req.params.name)[0];
	return res.json(item);
});

/** PATCH /items/:name: update a particular item */
router.get("/:name", function (req, res) {
  const item = items.filter(item => item.name === req.params.name)[0];
  item.name = req.body.name || item.name;
  item.price = req.body.price || item.price;

	return res.json({updated: item});
});

/** DELETE /items/:name: delete a particular item */
router.get("/:name", function (req, res) {
  items = items.filter(item => item.name !== req.params.name);

	return res.json({message: "Deleted"});
});

module.exports = router;