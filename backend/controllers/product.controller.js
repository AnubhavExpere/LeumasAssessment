import pool from "../db/index.js";


const getAllProducts = async (req, res) => {
    try {
        const response = await pool.query(`SELECT * FROM product`);
        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Get Product failed.'})
    }
}

const getProduct = async (req, res) => {
    console.log('Adding product.');
    const product_id = req.params.id;
    try {
        const response = await pool.query(`SELECT * FROM product WHERE id = $1`, [parseInt(product_id)]);
        if(response.rows.length === 0)
            return res.status(400).json({message: 'Product not found.'})
        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Get Product failed.'})
    }
}

const insertProduct = async (req, res) => {
    const {product_name, category, quantity, sku} = req.body;
    if(!product_name || !category || !quantity || !sku)
        res.status(500).json({message: "Invalid product"});

    try {
        const response = await pool.query(`INSERT  INTO product (name, category, current_stock, sku) 
            VALUES ($1, $2, $3, $4)`, [product_name, category, parseInt(quantity), parseInt(sku)]);
        res.status(200).json({message: 'Product added succesfully.'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Insert product failed.'})
    }
}

const editProduct = async (req, res) => {
    const {id, product_name, category, quantity, sku} = req.body;
    if(!product_name || !category || !quantity || !sku)
        res.status(500).json({message: "Invalid product"});

    try {
        const response = await pool.query(`UPDATE product SET name=$2, category=$3, current_stock=$4, sku=$5
            WHERE id=$1 RETURNING id, name, category, current_stock, sku`, [parseInt(id), product_name, category, parseInt(quantity), parseInt(sku)]);
        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Edit product failed.'})
    }
}

export {insertProduct, getProduct, getAllProducts, editProduct}