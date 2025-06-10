import { useState } from "react";

const AddTransaction = () => {
    const [formData, setFormData] = useState({
        product_id: '',
        type: '',
        quantity: '',
    })

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch('http://localhost:8000/transactions', {
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
                    <label>Product ID: </label>
                    <input type="number" name='product_id' value={formData.product_id} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Type: </label>
                    <input type="text" name='type' value={formData.type} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Quantity: </label>
                    <input type="number" name='quantity' value={formData.quantity} onChange={handleInputChange}></input>
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>Add</button>
                </div>
            </form>
        </>
    )
}

export default AddTransaction;