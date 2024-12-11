import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import OrderIndex from './components/Order/OrderIndex';
import Home from './components/Home/Home';
import ProductDeet from './components/PDdetails/ProductDeet';
import CartPage from './components/Cart/CartPage';
import CartContext from './context/CartContext';

function App() {
  return (
    <CartContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>}/>
            {/* <Route index element={<SignUp/>} /> */}
            <Route path="order" element={<OrderIndex/>} />
            <Route path="Home" element={<Home/>} />
            <Route path="details/:productId" element={<ProductDeet/>} />
            <Route path="cart" element={<CartPage/>} />
            {/* <Route path="*" element={<Pro/>} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </CartContext>
  );
}

export default App;
