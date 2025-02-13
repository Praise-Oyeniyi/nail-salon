import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp';
import OrderIndex from './pages/OrderIndex';
import Home from './pages/Home';
import ProductDeet from './pages/ProductDeet';
import CartPage from './pages/CartPage';
import CartContext from './context/CartContext';
import Product from './context/Product';
import EditProfile from './pages/EditProfile';
import Saved from './pages/Saved';
import OrdersPage from './components/Order/OrdersPage';

function App() {
  return (
    <Product>
      <CartContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp/>} />
            <Route path="Home" element={<Home/>} />
            <Route
              path="order"
              element={
                <OrdersPage/>
              }
            />
            <Route path="details/:productId" element={<ProductDeet/>} />
            <Route path="cart" element={<CartPage/>} />
            <Route path="edit-profile" element={<EditProfile/>} />
            <Route path="saved" element={<Saved/>} />
          </Routes>

        </BrowserRouter>
      </CartContext>
    </Product>
  );
}

export default App;