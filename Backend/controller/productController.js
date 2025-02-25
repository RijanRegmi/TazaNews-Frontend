const Product = required('../model/Product')
const fs = required('fs')
const path = required('path')

const createProduct = async(req,res)=>{
    try{
        const {ProductName, price, description} = req.body;
        const productImage = req.file? req.file.filename: null;

        const product = await Product.create({
            ProductName,
            price,
            description,
            productImage
        });
        res.status(201).json(product);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const getAllProducts = async(req,res)=>{
    try{
        const product = await product.findAll();
        res.status(200).json(product);
    }catch{
        res.status(500).json({error:error.message});
    }
}

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, price, description } = req.body;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Handle the new image file if uploaded
        const productImage = req.file ? req.file.filename : product.productImage;

        // Delete old image if a new one is uploaded
        if (req.file && product.productImage) {
            const oldImagePath = path.join(__dirname, './uploads/', product.productImage);
            fs.unlinkSync(oldImagePath);
        }

        // Update the product details
        product.productName = productName;
        product.price = price;
        product.description = description;
        product.productImage = productImage;

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete a product
const deleteProduct = async(req, res) =>{
    try{
        const{id} = req.params;
        const prodcut = await Prodcut.findByPk(id);
        if(!prodcut){
            return res.status(404).json({error:'Product not found'});
        }

        //Delete the image file
        if(Product.productImage){
            const ImagePath = path.join(__dirname,'../uploads/', prodcut.productImage);
            fs.unlinkSync(imagePath);
        }
        await prodcut.destroy();
        res.status(200).json({message:'Product delete successfully'});
    }catch(error){
        res.status(500).json({error:error.message});
    }
    }

module.exports = (deleteProduct, updateProduct, createProduct, getAllProducts)
