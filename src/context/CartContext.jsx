import {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";



export const CartContextProvider = createContext();




const CartContext = ({children}) => {
    const [total, setTotal] = useState([]);
    const [cart, setCart] = useState([]);
    const [sum, setSum] = useState(0)
    const [saved, setSaved] = useState([]);
    const [savedItems, setSavedItems] = useState([])


    const fetchCartItems = useCallback(async () => {
        try {
            const response = await fetch('https://wittynailtip.com/backend/cart.php', {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            if(data.success){
                setCart(data.data || []);
            }else{
                setCart(null)
            }
            
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }, [setCart]);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);
    

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
        .then(data => {console.log('Added to cart:', data); alert('Added to cart'); fetchCartItems();})
        .catch(error => console.error('Error adding to favorites:', error));
    }

    const addtoCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === item.product_id || cartItem.product_id ===item.id);
    
        if (existingItemIndex > -1) {
            const updatedCart = cart.map((cartItem, index) => {
                if (index === existingItemIndex) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            });
            setCart(updatedCart);
            addCartApi(item?.product_id || item.id, updatedCart[existingItemIndex].quantity);
        } else {
            const newCartItem = { ...item, quantity: 1, product_id: item.product_id || item.id };
            setCart([...cart, newCartItem]);
            addCartApi(item?.product_id || item.id, 1);
        }
    };

    const removedItem = (productId) => {
        const updatedCart = cart.map((item) => {
            if (item.product_id === productId || item.id === productId) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return null; 
            }
            return item;
        }).filter(Boolean);
        
        setCart(updatedCart);
        
        const updatedItem = updatedCart.find(item => item.product_id === productId || item.id === productId);
        const newQuantity = updatedItem ? updatedItem.quantity : 0;
        
        addCartApi(productId, newQuantity);
    };


    const deleteCartItem = async (cartId) => {
        const cartDel = { "cart_id": cartId };
        
        try {
            const newCart = cart.filter(item => item.cart_id !== cartId);
            setCart(newCart);
            
            const response = await fetch('https://wittynailtip.com/backend/del-cart.php', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(cartDel)
            });
            
            const data = await response.json();
            
            if (data.success) {
                fetchCartItems();
                alert('Cart Item Deleted');
            } else {
                fetchCartItems();
                alert('Failed to delete item. Please login and try again.');
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
            // Revert optimistic update on error
            fetchCartItems();
            alert('Error deleting item. Please try again.');
        }
    };




    useEffect(() => {
        fetchSavedItems();
    }, []);

    // Function to fetch saved items
    const fetchSavedItems = () => {
        fetch('https://wittynailtip.com/backend/fav.php', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setSavedItems(data.data);
        })
        .catch(error => console.error('Error fetching saved:', error));
    };

    const addToSave = async (item, newLikeState) => {
        if (newLikeState) {
            // Check if item is not already saved
            if (!savedItems.some(savedItem => savedItem.id === item.id)) {
                const prod = { "product_id": item.id };

                try {
                    const response = await fetch('https://wittynailtip.com/backend/add-to-fav.php', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(prod)
                    });
                    const data = await response.json();
                    console.log('Added to favorites:', data);
                    
                    // Fetch updated saved items after successful addition
                    fetchSavedItems();
                } catch (error) {
                    console.error('Error adding to favorites:', error);
                }
            }
        } else {
            const itemToUnsave = savedItems.find((e) => e.id === item.id);
            if (itemToUnsave) {
                const itemPrep = { "fav_id": itemToUnsave.fav_id };

                try {
                    const response = await fetch('https://wittynailtip.com/backend/del-fav.php', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(itemPrep)
                    });
                    const data = await response.json();
                    alert('Item deleted from favorites');
                    fetchSavedItems();
                } catch (error) {
                    console.error('Error deleting fav:', error);
                }
            }
        }
    };


    return (
        <CartContextProvider.Provider value={{cart,addtoCart, removedItem, total, sum, setSum, setTotal, saved, setSaved, addToSave, savedItems, deleteCartItem }}>
            {children}
        </CartContextProvider.Provider>
    );
}

export default CartContext;