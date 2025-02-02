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


    const addtoCart = (item) =>{
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        console.log(existingItemIndex)
        if(cart.length !== 0 && existingItemIndex > -1){

            const updatedCart = cart.map((cartItem, index) => {
                if (index === existingItemIndex) {
                    return { ...cartItem, count: cartItem.count + 1 };
                }
                return cartItem;
            });
            setCart(updatedCart)
            setTotal(cart.reduce((sum, item) => sum + (item.count * item.prices[0].unit_amount), 0).toFixed(2));
        }else if(data.filter(picked=> picked.id === item.id)){         
            setCart([...cart, {...item, count:1} ])
            setTotal(cart.reduce((sum, item) => sum + (item.count * item.prices[0].unit_amount), 0).toFixed(2));
        }
        addtoCart()
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

    useEffect(() => {
        if(cart.length>0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart])


    // useEffect(() => {
    //     fetch('https://wittynailtip.com/backend/cart.php', {
    //         credentials: 'include',
    //         headers: {
    //             'Accept': 'application/json'
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error('Error fetching cart:', error));
    // }, []);

    const getSaved = ()=>{
        fetch('https://wittynailtip.com/backend/fav.php', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching saved:', error));
    }


    // Option 1: Use the callback form of setSaved
    const addToSave = (id) => {
        setSaved(prevSaved => {
            const newSaved = [...prevSaved, id];
            
            fetch('https://wittynailtip.com/backend/add-to-fav.php', {
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: `${id}`
            })
            .then(response => response.json())
            .then(data => {
                console.log('Added to favorites:', data);
            })
            .catch(error => console.error('Error adding to favorites:', error));

            return newSaved;
        });
    }


    // const addToCartfn = (itemId) => {
    //     fetch('https://wittynailtip.com/backend/add-to-fav.php', {
    //         method: 'POST',
    //         credentials: 'include',  // Important for your session cookie
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Accept': 'application/json'
    //         },
    //         body: `item_id=${itemId}`  // Send the item ID as form data
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Added to favorites:', data);
    //         // Handle success (maybe update UI or show a message)
    //     })
    //     .catch(error => console.error('Error adding to favorites:', error));
    // };



    return (
        <CartContextProvider.Provider value={{cart, setCart, addtoCart, removedItem, total, sum, setSum, setTotal, saved, setSaved, getSaved, addToSave }}>
            {children}
        </CartContextProvider.Provider>
    );
}

export default CartContext;