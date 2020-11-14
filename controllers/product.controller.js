const productModel = require("../models/product.model");
const ProductModel = require("../models/product.model");

module.exports = {
  getProductList: (req, res, next) => {
    console.log(productModel.get());
    res.render("product/product-list", productModel.get());
  },
  getProductById: (req, res, next) =>
    res.render("product/product-detail", { title: "Express" }),
};
