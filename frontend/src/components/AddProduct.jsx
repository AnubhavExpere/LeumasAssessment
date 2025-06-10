import { useState } from "react";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        product_name: '',
        category: '',
        quantity: '',
        sku: ''
    })

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch('http://localhost:8000/product', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <>
            <form>
                <div>
                    <label>Product Name: </label>
                    <input type="text" name='product_name' onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Product Category: </label>
                    <input type="text" name='category' onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Product Initial Quantity: </label>
                    <input type="number" name='quantity' onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Product SKU: </label>
                    <input type="text" name="sku" onChange={handleInputChange}></input>
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>Add</button>
                </div>
            </form>
        </>
    )
}

export default AddProduct;