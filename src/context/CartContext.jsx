import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { ProductContextProvider } from "./Product";



export const CartContextProvider = createContext();




const CartContext = ({children}) => {
    const {data} = useContext(ProductContextProvider)
    const [total, setTotal] = useState([]);
    const [cart, setCart] = useState([]);
    const [sum, setSum] = useState(0)
    const [saved, setSaved] = useState([]);
    
    
    useEffect(() => {
        fetch('https://wittynailtip.com/backend/cart.php', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setCart(data.data))
        .catch(error => console.error('Error fetching cart:', error));
    }, []);
    

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
        setSaved(savedItems);
    }, []);

    console.log(cart)
    const addCartApi = (id, amount) =>{
        const cartProd = {"product_id":id, "quantity":amount, "color":'color', size:'size'};
        fetch('https://wittynailtip.com/backend/add-to-cart.php', {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(cartProd)
        })
        .then(response => response.json())
        .then(data => console.log('Added to cart:', data))
        .catch(error => console.error('Error adding to favorites:', error));
    }

    const addtoCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === item.id);
    
        if (existingItemIndex > -1) {
            const updatedCart = cart.map((cartItem, index) => {
                if (index === existingItemIndex) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            });
            setCart(updatedCart);
            addCartApi(item?.id, updatedCart[existingItemIndex].quantity);
        } else {
            const newCartItem = { ...item, quantity: 1, product_id: item.id };
            setCart([...cart, newCartItem]);
            addCartApi(item?.id, 1);
        }
    };

    const removedItem = (productId) => {
        const updatedCart = cart.map((item) => {
            if (item.product_id === productId) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return null; 
            }
            return item;
        }).filter(Boolean);
        
        setCart(updatedCart);
        
        const updatedItem = updatedCart.find(item => item.product_id === productId);
        const newQuantity = updatedItem ? updatedItem.quantity : 0;
        
        addCartApi(productId, newQuantity);
    };
    
    const addToSave = (id, newLikeState) => {
        const prod = {"product_id":id}
        const savedItems = JSON.parse(localStorage.getItem('savedItems') || '[]');
    
        if (newLikeState) {
            if (!savedItems.includes(id)) {
                const updatedSavedItems = [...savedItems, id];
                setSaved(updatedSavedItems);
                
                localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
                
                fetch('https://wittynailtip.com/backend/add-to-fav.php', {
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(prod)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Added to favorites:', data);
                })
                .catch(error => console.error('Error adding to favorites:', error));
                }
        } else {
            const updatedSavedItems = savedItems.filter(savedId => savedId !== id);
            setSaved(updatedSavedItems);
            
            localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
        }
    }



    return (
        <CartContextProvider.Provider value={{cart, setCart, addtoCart, removedItem, total, sum, setSum, setTotal, saved, setSaved, addToSave }}>
            {children}
        </CartContextProvider.Provider>
    );
}

export default CartContext;