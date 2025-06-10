import { useState, useEffect } from "react";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import '../styles/Products.css'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(()=> {
        const loadProducts =  async ()=> {
            try {
                const response = await fetch('http://localhost:8000/product');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        }
        loadProducts();
    }, [])

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowEdit(true);
    }


    return (
        <div className="products-container">
            <div className="edit-product-container">
                {showEdit && <EditProduct product={editingProduct} setEditingProduct={setEditingProduct} setShowEdit={setShowEdit}/>}
            </div>
            <div className="product-table-container">
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>SKU</th>
                        <th>Edit Product</th>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            return (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.current_stock}</td>
                                <td>{product.sku}</td>
                                <td style={{cursor: 'pointer'}} onClick={() => handleEdit(product)}>Edit</td>
                            </tr> 
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="add-product-container">
                <AddProduct />
            </div>
        </div>
    );
}

export default Products;