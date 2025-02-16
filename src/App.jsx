import './App.css';
import 'react-toastify/dist/ReactToastify.css';
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
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Product>
      <CartContext>
        <Toaster 
        toastOptions={{
          style: {
            fontSize: '14px',
          },
          success: {
            style: {
              background: '#E1F7EB',
              color: '#20AA5F',
              borderColor:"#20AA5F",
              borderWidth:0.5
            }
          },
          error: {
            style: {
              background: '#F7EAE9',
              color: '#FF3B30',
              borderColor:"#FF3B30",
              borderWidth:0.5
            }
          },
        }}/>
        <ToastContainer position="bottom-center" autoClose={3000} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="auth" element={<SignUp/>} />
            <Route
              path="order"
              element={
                <OrdersPage/>
              }
            />
            <Route
              path="order/:orderId"
              element={
                <OrderIndex/>
              }
            />
            <Route path="details/:productId" element={<ProductDeet/>} />
            <Route path="cart" element={<CartPage/>} />
            <Route path="edit-profile" element={<EditProfile/>} />
            <Route path="saved" element={<Saved/>} />
            <Route path="*" element={<div className='w-full h-screen flex items-center justify-center'>
              Page Not found</div>} />
            </Routes>

        </BrowserRouter>
      </CartContext>
    </Product>
  );
}

export default App;