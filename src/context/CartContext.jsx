import {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import { toast } from "react-hot-toast";
import { fetchApi, sendApi } from "../apis/Index";



export const CartContextProvider = createContext();

const CartContext = ({children}) => {
    const [cart, setCart] = useState([]);
    const [saved, setSaved] = useState([]);
    const [savedItems, setSavedItems] = useState([])
    const [cartError, setCartError] = useState(null);
    const [favError, setFavError] = useState(null);
    const [favCheckError, setFavCheckError] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);


    const fetchCartItems = useCallback(() => {
        const fetchCartApi = 'https://wittynailtip.com/backend/cart.php';
        async function fetchData(){try {
                const result = await fetchApi(fetchCartApi)
                if (result.data.success){
                    setCart(result.data.data || []);
                } else {
                    setCart([])
                    setCartError(result.data.message)
                }
            } catch (error) {
                setCartError(error)
            }
        }
        fetchData();
    }, [setCart]);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);
    

    const addCartApi = async (id, amount, color, size) =>{
        const atcApi = 'https://wittynailtip.com/backend/add-to-cart.php'
        const cartProd = { "product_id": id, "quantity": amount, "color": color, "size": size };
        try {
            setAddingToCart(true);
            const result = await sendApi(cartProd, atcApi)
            if (result.data.success){
                fetchCartItems()
                toast.success("Added to cart")
            } else {
                toast.error(result.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setAddingToCart(false);
        }
    }

    const addtoCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => 
            cartItem.product_id === item.product_id || cartItem.product_id ===item.id);
    
        if (existingItemIndex > -1) {
            const updatedCart = cart.map((cartItem, index) => {
                if (index === existingItemIndex) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            });
            setCart(updatedCart);
            addCartApi(
                item?.product_id || item.id, 
                item?.quantity || updatedCart[existingItemIndex].quantity,
                updatedCart[existingItemIndex].color || item?.color,
                updatedCart[existingItemIndex].size || item?.size,
            );
        } else {
            const newCartItem = { ...item, quantity: 1, product_id: item.product_id || item.id };
            setCart([...cart, newCartItem]);
            addCartApi(item?.product_id || item.id, 1, item?.color, item?.size);
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
        const dcApi = 'https://wittynailtip.com/backend/del-cart.php'
        try {
            const newCart = cart.filter(item => item.cart_id !== cartId);
            setCart(newCart);
            const result = await sendApi(cartDel, dcApi)
            if (result.data.success){
                fetchCartItems()
                alert('Cart Item Deleted');
            } else {
                fetchCartItems();
                alert('Failed to delete item. Please login and try again.');
                toast.error(result.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSavedItems();
    }, []);

    // Function to fetch saved items
    const fetchSavedItems = async () => {
        const saveFetchApi = 'https://wittynailtip.com/backend/fav.php'
        try {
            const result = await fetchApi(saveFetchApi)
            if (result.data.success){
                setSavedItems(result.data.data);
                // alert('Item Saved fetched');
            } else {
                setFavError(result.data.message)
            }
        } catch (error) {
            setFavError(error)
        }
    };


    // check saved and add or remove
    const addToSave = async (item, newLikeState) => {
        if (newLikeState) {
            // Check if item is not already saved
            if (!savedItems.some(savedItem => savedItem.id === item.id)) {
                const prod = { "product_id": item.id };
                const atsApi = 'https://wittynailtip.com/backend/add-to-fav.php';

                try {
                    const result = await sendApi(prod, atsApi)
                    if (result.data.success){
                        // added to save
                        fetchSavedItems();
                        setFavCheckError(false);
                        toast.success('Item saved')
                    } else {
                        toast.error(result.data.message)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            const itemToUnsave = savedItems.find((e) => e.id === item.id);
            if (itemToUnsave) {
                const itemPrep = { "fav_id": itemToUnsave.fav_id };
                const delFavApi = 'https://wittynailtip.com/backend/del-fav.php';

                try {
                    const result = await sendApi(itemPrep, delFavApi)
                    if (result.data.success){
                        fetchSavedItems();
                        toast.success('Item removed from saved')
                    } else {
                        toast.error(result.data.message)
                        alert('error in saved')
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    };


    return (
        <CartContextProvider.Provider value={
            {
                cart,
                cartError,
                addtoCart, 
                removedItem,
                saved,
                favError, 
                favCheckError,
                setSaved, 
                addToSave, 
                savedItems, 
                deleteCartItem ,
                addingToCart,
            }}>
            {children}
        </CartContextProvider.Provider>
    );
}

export default CartContext;