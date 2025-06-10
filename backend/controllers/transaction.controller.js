import pool from "../db/index.js";

const getTransactionByProduct = async (req, res) => {
    const product_id = req.query.product_id;
    try {
        const response = await pool.query(`SELECT * FROM transactions WHERE product_id=$1 `, [parseInt(product_id)]);
        if(response.rows.length === 0)
            return res.status(200).json({message: 'No transactions found.'})
        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Get Transaction failed.'})
    }
}

const insertTransaction = async (req, res) => {
    const {product_id, quantity, type} = req.body;
    if(!product_id || !quantity || !type)
        res.status(500).json({message: "Invalid Transaction"});

    const result = await pool.query(`SELECT current_stock FROM product WHERE id=$1`, [product_id]);

    let product_current_stock = parseInt(result.rows[0].current_stock);

    if(type=='IN'){
        product_current_stock += parseInt(quantity);
    } else if (type=='OUT')
        product_current_stock -= parseInt(quantity);

    try {
        await pool.query(`UPDATE product SET current_stock=$1 WHERE id=$2`, [parseInt(product_current_stock), parseInt(product_id)])

        const response = await pool.query(`INSERT  INTO transactions (product_id, type, quantity) 
            VALUES ($1, $2, $3)`, [product_id, type, parseInt(quantity)]);
        res.status(200).json({message: 'Transaction added succesfully.'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Insert Transaction failed.'})
    }
}

export {insertTransaction, getTransactionByProduct}