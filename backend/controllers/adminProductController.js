const Product = require('../models/productModel');
const Brand = require('../models/brandModel');
const fs = require("fs");
const path = require("path");

const {unListProduct,editProduct,fetchFilteredProducts,restoreProduct}=require('../helpers/adminProductHelpers')
const mongoose = require('mongoose');


exports.getProduct =async (req,res)=>{

  try {
      const data = await fetchFilteredProducts(req.query);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }

}
exports.addProduct = async (req, res) => {
  
  
//   console.log(req.body,'this is images');
    try {
    const { brand } = req.body;
    

    // Validate brand
    if (!mongoose.Types.ObjectId.isValid(brand)) {
      return res.status(400).json({ message: 'Invalid brand ID format' });
    }

    const existingBrand = await Brand.findOne({ _id: brand, isDeleted: false });
    if (!existingBrand) {
      return res.status(400).json({ message: 'Brand does not exist or is deleted' });
    }

    const newProduct = new Product(req.body);
    const product=await newProduct.save();
    res.status(201).json({ message: 'Product created successfully',productId:product.id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
};

exports.unListProduct = async (req, res) => {
  try {
    const product = await unListProduct(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted (soft)', product });
  } catch (err) {
    console.log( err.message);
    
    res.status(500).json({ message: 'Failed to delete', error: err.message });
  }
};

exports.restoreProductController = async (req, res) => {
  try {
    const product = await restoreProduct(req.params.id);
    res.status(200).json({ message: "Product restored", product });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Failed to restore product" });
  }
};


exports.updateProduct = async (req, res) => {
  try {

     const productId = req.params.id;
     const { imagesToDelete } = req.body;



     
     const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }


       let deletedImages = [];
    if (imagesToDelete) {
      deletedImages = JSON.parse(imagesToDelete);
    }

   deletedImages.forEach((img) => {
  if (typeof img === "string" && img.trim() !== "") {
    const imgPath = path.join(__dirname, "../public/products", img);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }
});



     const remainingImages = existingProduct.images.filter(
      (img) => !deletedImages.includes(img)
    );

    // New uploaded images (via sharp middleware)
    // const newImageFiles = req.files?.map((file) => file.filename) || [];


      // Final image array to update
    // const finalImages = [...remainingImages, ...newImageFiles];

    const newImageFiles = req.body.images || []; // from resizeAndSaveImages
const finalImages = [...remainingImages, ...newImageFiles];


    const updatedData = {
      ...req.body,
      images: finalImages,
    };

    // const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // const updated = await editProduct(req.params.id, req.body);

        const updatedProduct = await editProduct(productId, updatedData);

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated', updatedProduct });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: 'Failed to update', error: err.message });
  }
};







exports.addUser=async (req,res)=>{
  const {email,name}=req.body

  const exists=await User.findOne({email:email})

  if(!exists)
    await User.insertOne({email:email,name:name})

    
}