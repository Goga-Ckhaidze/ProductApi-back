import Product from '../models/product.js';
import mongoose from 'mongoose';


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log("error in fetching products", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

const createProduct = async (req, res) => {

    const product = req.body;
    
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct})
    } catch(error) {
        console.error("Error in Create produt:", error.message)
        res.status(500).json({ success:false, message: "Server Error" })
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success:false, message: "Invalid Product Id"})
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" })
    } catch (error) {
        console.log("error in deleting product:", error.message)
        res.status(404).json({ success: false, message: "Product not founded"})
    }
}

    
const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success:false, message: "Invalid Product Id"})
    }
    try {
       const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true})
       res.status(200).json({ success: true, data: updatedProduct, message: "Product Updated"})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

const findProductById = async (req, res) => {
    const {id} = req.query;
    try {
        if(!id) {
            res.status(404).json({ success: false, message: "Davai Naxui Aqedan"})
        }

        const find = await Product.findOne({_id: id})

        if(find) {
            res.status(200).json(find)
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"})
    }
    
}

export { getProducts, createProduct, updateProduct, deleteProduct, findProductById }; 