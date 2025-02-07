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
    console.log(cart)


    const addCartApi = (id) =>{
        const cart = {"product_id":id}
        fetch('https://wittynailtip.com/backend/add-to-cart.php', {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: JSON.stringify(cart)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Added to Cart:', data);
        })
        .catch(error => console.error('Error adding to favorites:', error));
    }

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
            addCartApi(item?.id)
            // setTotal(cart.reduce((sum, item) => sum + (item.count * item.prices[0].unit_amount), 0).toFixed(2));
        }else if(data.filter(picked=> picked.id === item?.id)){         
            setCart([...cart, {...item, count:1} ])
            addCartApi(item?.id)
            // setTotal(cart.reduce((sum, item) => sum + (item.count * item.prices[0].unit_amount), 0).toFixed(2));
        }
    }

    const removedItem = (productId) => {
        const newCart = cart.map((e)=>{
            if(e.id === productId && e.count >= 1){
                return { ...e, count: e.count - 1 };
            }else if(e.id === productId && e.count <= 1){
                return null
            }
            return e;
        }).filter(Boolean);
        
        setCart(newCart)
        setTotal(cart.reduce((sum, item) => sum + (item.count * item.prices[0].unit_amount), 0).toFixed(2));
    }
    
    const addToSave = (id) => {
        // setSaved(prevSaved => {
            // const newSaved = [...prevSaved, id];
            const prod = {"product_id":id}
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

            // return newSaved;
        // });
    }



    return (
        <CartContextProvider.Provider value={{cart, setCart, addtoCart, removedItem, total, sum, setSum, setTotal, saved, setSaved, addToSave }}>
            {children}
        </CartContextProvider.Provider>
    );
}

export default CartContext;