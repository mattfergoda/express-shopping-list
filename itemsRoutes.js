"use strict";

const express = require("express");

const { NotFoundError, BadRequestError } = require("./expressError");
let { items } = require("./fakeDb");

const router = new express.Router();

/**Validate that item exists in database, else throw 404 */
function validateItem(req, res, next) {
  const matchedItems = items.filter(item => item.name === req.params.name);

  if (matchedItems.length === 0) {
    throw new NotFoundError(`${req.params.name} not found`);
  }

  next();
}

/**Validate JSON body for a new item. */
function validateNewItemJSON(req, res, next) {
  const inputs = ['name', 'price'];

  for (let input of inputs) {
    if (!(input in req.body)) {
      throw new BadRequestError(`${input} required.`);
    }
  }

  next();
}

/**Validate JSON body for updating item. */
function validateUpdateItemJSON(req, res, next) {
  const inputs = ['name', 'price'];

  console.log("Req.body", req.body)
  for (let input in req.body) {
    if (inputs.includes(input)) {
      next();
    }
  }

  throw new BadRequestError("Name or price required.");
}

/** GET /items: get list of items */
router.get("/", function (req, res) {
  return res.json({ items });
});

/** POST /items: add item to list */
router.post("/", validateNewItemJSON, function (req, res) {
  const newItem = {
    name: req.body.name,
    price: req.body.price,
  };

  items.push(newItem);

  return res.status(201).json({ added: newItem });
});

/** GET /items/:name: get particular item */
router.get("/:name", validateItem, function (req, res) {
  const item = items.filter(item => item.name === req.params.name)[0];
  return res.json(item);
});

/** PATCH /items/:name: update a particular item */
router.patch(
    "/:name",
    validateItem,
    validateUpdateItemJSON,
    function (req, res) {
      const item = items.filter(item => item.name === req.params.name)[0];
      item.name = req.body.name || item.name;
      item.price = req.body.price || item.price;

      return res.json({ updated: item });
});

/** DELETE /items/:name: delete a particular item */
router.delete("/:name", validateItem, function (req, res) {
  items = items.filter(item => item.name !== req.params.name);

  return res.json({ message: "Deleted" });
});

module.exports = router;