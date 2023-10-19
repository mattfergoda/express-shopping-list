"use strict";

const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError");
const itemsRoutes = require("./itemsRoutes");

app.use(express.json());

app.use("/items", itemsRoutes);

/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/**
* Error handler: logs stacktrace and returns JSON error message.
* Keep below all other routes.
*/
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;