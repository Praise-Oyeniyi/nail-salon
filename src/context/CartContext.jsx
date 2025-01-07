import {
    createContext,
    useEffect,
    useState,
} from "react";
import { ProductItems } from "../Products/ProductInfo";
export const CartContextProvider = createContext();




const CartContext = ({children}) => {
    const [total, setTotal] = useState([]);
    const [cart, setCart] = useState([]);
    const [sum, setSum] = useState(0)


    console.log(total)

    const addtoCart = (item) =>{
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if(cart.length !== 0 && existingItemIndex > -1){

            const updatedCart = cart.map((cartItem, index) => {
                if (index === existingItemIndex) {
                    return { ...cartItem, count: cartItem.count + 1 };
                }
                return cartItem;
            });
            setCart(updatedCart)
        }else if(ProductItems.filter(picked=> picked.id == item.id)){         
            setCart([...cart, {...item, count:1} ])
        }
    }

    const removedItem = (productId) => {
        const newCart = cart.map((e)=>{
            if(e.id == productId && e.count >= 1){
                return { ...e, count: e.count - 1 };
            }else if(e.id == productId && e.count <= 1){
                return null
            }
            return e;
        }).filter(Boolean);
        
        setCart(newCart)
    }

    useEffect(() => {
        if(cart.length>0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart])



    return (
        <CartContextProvider.Provider value={{cart, setCart, addtoCart, removedItem, total, sum, setSum, setTotal }}>
            {children}
        </CartContextProvider.Provider>
    );
}

export default CartContext;