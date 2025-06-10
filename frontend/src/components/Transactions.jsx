import { useEffect, useState } from "react";
import AddTransaction from "./AddTransaction";
import '../styles/Transactions.css'

const Transactions = () => {
    const [productId, setProductId] = useState('');
    const [transactions, setTransactions] = useState([]);


    const loadTransactions = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/transactions?product_id=${productId}`);
            const data = await response.json();
            setTransactions(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="transactions-container">
            <div className="product-select-container">
                <label>Enter product id: </label>
                <input type='number' value={productId} onChange={(e)=>setProductId(e.target.value)}></input>
                <button type='submit' onClick={loadTransactions}>Submit</button>
            </div>
            <div className="transactions-table-container">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Timestamp</th>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.quantity}</td>
                                <td>{transaction.timestamp}</td>
                            </tr> 
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="add-transactions-container">
                <AddTransaction />
            </div>
        </div>
    );
}

export default Transactions;

