import { useState } from "react";

const EditProduct = ({product, setEditingProduct, setShowEdit}) => {
    const [formData, setFormData] = useState({
        id: product.id,
        product_name: product.name,
        category: product.category,
        quantity: product.current_stock,
        sku: product.sku
    })

    console.log("data: ", product)

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch('http://localhost:8000/product', {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await (response.json());
            setEditingProduct(null);
            setShowEdit(false);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <>
            <form>
                <div>
                    <label>Product Name: </label>
                    <input type="text" name='product_name' value={formData.product_name} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Product Category: </label>
                    <input type="text" name='category' value={formData.category}  onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Product Initial Quantity: </label>
                    <input type="number" name='quantity' value={formData.quantity}  onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Product SKU: </label>
                    <input type="text" name="sku" value={formData.sku}  onChange={handleInputChange}></input>
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>Edit</button>
                </div>
            </form>
        </>
    )
}

export default EditProduct;