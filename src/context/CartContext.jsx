import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchApi, sendApi } from "../apis/Index";
import { VscClose } from "react-icons/vsc";
import { IoLogInOutline } from "react-icons/io5";

export const CartContextProvider = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [cartError, setCartError] = useState(null);
  const [favError, setFavError] = useState(null);
  const [favCheckError, setFavCheckError] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [deletingCartItem, setDeletingCartItem] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userAvailable, setUserAvailable] = useState(false);

  const fetchCartItems = useCallback(() => {
    const fetchCartApi = "https://wittynailtip.com/backend/cart.php";
    async function fetchData() {
      try {
        const result = await fetchApi(fetchCartApi);
        if (result.data.success) {
          setCart(result.data.data || []);
          setUserAvailable(true);
        } else {
          setCart([]);
          setCartError(result.data.message);
        }
      } catch (error) {
        setCartError(error);
      }
    }
    fetchData();
  }, [setCart]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addCartApi = async (id, amount, color, size) => {
    const atcApi = "https://wittynailtip.com/backend/add-to-cart.php";
    const cartProd = {
      product_id: id,
      quantity: amount,
      color: color,
      size: size,
    };
    try {
      setAddingToCart(true);
      const result = await sendApi(cartProd, atcApi);
      if (result.data.success) {
        fetchCartItems();
        toast.success("Added to cart");
      } else {
        setShowLoginModal(true);
        toast.error(result.data.message);
      }
    } catch (error) {
      setCartError(error);
      toast.error("An error occurred. Please login and try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  const addtoCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.product_id === item.product_id ||
        cartItem.product_id === item.id
    );

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
        item?.quantity,
        updatedCart[existingItemIndex].color || item?.color,
        updatedCart[existingItemIndex].size || item?.size
      );
    } else {
      const newCartItem = {
        ...item,
        quantity: 1,
        product_id: item.product_id || item.id,
      };
      setCart([...cart, newCartItem]);
      addCartApi(item?.product_id || item.id, 1, item?.color, item?.size);
    }
  };

  const removedItem = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.product_id === productId || item.id === productId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return null;
        }
        return item;
      })
      .filter(Boolean);

    setCart(updatedCart);

    const updatedItem = updatedCart.find(
      (item) => item.product_id === productId || item.id === productId
    );
    const newQuantity = updatedItem ? updatedItem.quantity : 0;
    const color = updatedItem ? updatedItem.color : null;
    const size = updatedItem ? updatedItem.size : null;

    addCartApi(productId, newQuantity, color, size);
  };

  const deleteCartItem = async (cartId) => {
    const cartDel = { cart_id: cartId };
    const dcApi = "https://wittynailtip.com/backend/del-cart.php";
    try {
      setDeletingCartItem(true);
      const newCart = cart.filter((item) => item.cart_id !== cartId);
      setCart(newCart);
      const result = await sendApi(cartDel, dcApi);
      if (result.data.success) {
        fetchCartItems();
        toast.success("Cart Item Deleted");
      } else {
        fetchCartItems();
        toast.error("Failed to delete item. Please login and try again.");
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingCartItem(false);
    }
  };

  useEffect(() => {
    fetchSavedItems();
  }, []);

  // Function to fetch saved items
  const fetchSavedItems = async () => {
    const saveFetchApi = "https://wittynailtip.com/backend/fav.php";
    try {
      const result = await fetchApi(saveFetchApi);
      if (result.data.success) {
        setSavedItems(result.data.data);
        // alert('Item Saved fetched');
      } else {
        setFavError(result.data.message);
      }
    } catch (error) {
      setFavError(error);
    }
  };

  // check saved and add or remove
  const addToSave = async (item, newLikeState) => {
    if (newLikeState) {
      // Check if item is not already saved
      if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
        const prod = { product_id: item.id };
        const atsApi = "https://wittynailtip.com/backend/add-to-fav.php";

        try {
          const result = await sendApi(prod, atsApi);
          if (result.data.success) {
            // added to save
            fetchSavedItems();
            setFavCheckError(false);
            toast.success("Item saved");
          } else {
            toast.error(result.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      const itemToUnsave = savedItems.find((e) => e.id === item.id);
      if (itemToUnsave) {
        const itemPrep = { fav_id: itemToUnsave.fav_id };
        const delFavApi = "https://wittynailtip.com/backend/del-fav.php";

        try {
          const result = await sendApi(itemPrep, delFavApi);
          if (result.data.success) {
            fetchSavedItems();
            toast.success("Item removed from saved");
          } else {
            toast.error(result.data.message);
            alert("error in saved");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      {showLoginModal && (
        <div
          className="login-modal w-full h-full fixed top-0 
            left-0 bg-black bg-opacity-10 z-50 flex items-start justify-center"
        >
          <div
            className="login-modal-content w-full text-center
                relative mt-8 bg-white max-w-lg p-5 py-10 rounded-2xl"
          >
            <span
              className="close absolute top-3 right-4"
              onClick={handleLoginModalClose}
            >
              <VscClose size={20} />
            </span>
            <h2 className="text-center text-[#FFB7CF] font-jost font-medium text-xl">
              Login Required
            </h2>
            <p>You need to log in to continue.</p>
            <div className="flex justify-center mt-4">
              <IoLogInOutline size={45} strokeWidth={0} color="#FFB7CF" />
            </div>
            <div className="flex justify-center mt-4">
              <a href="/auth" className="text-[#FFB7CF] underline">
                Proceed to Login
              </a>
            </div>
          </div>
        </div>
      )}

      <CartContextProvider.Provider
        value={{
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
          deleteCartItem,
          addingToCart,
          setShowLoginModal,
          deletingCartItem,
          userAvailable,
        }}
      >
        {children}
      </CartContextProvider.Provider>
    </>
  );
};

export default CartContext;
