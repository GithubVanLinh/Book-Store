const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const productRouter = require("../routes/products");
const accountRouter = require("../routes/account");
const cartRouter = require("../routes/cart");

module.exports = function (app) {
  app.use("/products", productRouter);
  app.use("/account", accountRouter);
  app.use("/users", usersRouter);
  app.use("/cart", cartRouter);
  app.use("/", indexRouter);
};
