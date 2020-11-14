const ProductModel = require("../models/product.model");

module.exports = {
  getProductList: (req, res, next) => {
    // console.log(ProductModel.get());
    res.render("product/product-list", { productList: ProductModel.get() });
  },
  getProductById: (req, res, next) => {
      const id = req.params.id;
    //   console.log(id);
      const product = ProductModel.getProductById(id);
      console.log(product);
    res.render("product/product-detail", { product});
  },
};
