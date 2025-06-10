import logo from './logo.svg';
import './App.css';
import Products from './components/Products';
import Transactions from './components/Transactions';
import AddProduct from './components/AddProduct';
import AddTransaction from './components/AddTransaction';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/products' element={<Products />} />
        <Route path='/transactions' element={<Transactions />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
