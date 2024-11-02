import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import OrderIndex from './components/Order/OrderIndex';
import Home from './components/Home/Home';
import ProductDeet from './components/PDdetails/ProductDeet';
import CartPage from './components/Cart/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
          {/* <Route index element={<SignUp/>} /> */}
          <Route path="order" element={<OrderIndex/>} />
          <Route path="Home" element={<Home/>} />
          <Route path="details" element={<ProductDeet/>} />
          <Route path="cart" element={<CartPage/>} />
          {/* <Route path="*" element={<Pro/>} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
