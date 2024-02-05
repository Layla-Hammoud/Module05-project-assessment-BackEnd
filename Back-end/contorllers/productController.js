import Product from "../models/productModel.js";
// add
const AddProduct = async (req, res) => {
  const { name, description, price } = req.body;
  if (!req.file || !name || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const image = req.file.filename;
  try {
    // Create a new product
    const newProduct = await Product.create({
      name,
      description,
      image,
      price,
    });
    return res.status(200).json({ message: "product is created", newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding product", error });
  }
};
// delete
const deleteProduct = async (req, res) => {
  const productId = req.body.productId;
  try {
    const product = await Product.findById(productId);

    if (product) {
      await Product.findByIdAndDelete(productId);
      res
        .status(200)
        .json({ message: "Product and associated sizes deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// get add Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// edit
const editProduct = async (req, res) => {
  const { _id, name, description, price } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  const image = req.file.filename;
  try {
    const updatedproduct = await Product.findOneAndUpdate(
      { _id: _id },
      {
        name: name,
        description: description,
        image: image,
        price: price,
      }
    );
    res
      .status(200)
      .json({ message: "product Info edited succ", data: updatedproduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export { AddProduct, deleteProduct, getProducts, editProduct };
