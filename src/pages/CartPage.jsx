import React, { useContext, useEffect, useState } from "react";
import { CartContextProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";
import { fetchApi, sendApi } from "../apis/Index";
import { toast } from "react-hot-toast";
import { RiLoader4Fill } from "react-icons/ri";

const CartPage = () => {
  const { cart, cartError } = useContext(CartContextProvider);
  const [pay, setPay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
    }
  }, [cartError]);

  console.log(cart);

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      toast("Please enter a coupon code");
      return;
    }

    try {
      setIsCouponLoading(true);
      const result = await sendApi(
        { code: couponCode },
        "https://wittynailtip.com/backend/valid-coupon.php"
      );

      if (result.data && result.data.success) {
        toast.success(`${result.data.discount}% discount applied`);
        setDiscount(Number(result.data.discount) || 0);
        setCouponCode("");
        setShowCouponModal(false);
      } else {
        toast.error(result.data.message || "Invalid coupon code");
        setDiscount(0);
      }
    } catch (error) {
      toast.error("Error validating coupon");
      console.error(error);
    } finally {
      setIsCouponLoading(false);
    }
  };

  const payOrder = async () => {
    const payPend = { pay: "pay" };
    const payApi = "https://wittynailtip.com/backend/pend-order.php";
    try {
      setIsLoading(true);
      const result = await sendApi(payPend, payApi);
      if (result.data.success) {
        setPay(true);
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal =
    cart?.reduce((sum, item) => {
      const unitPrice = item.price?.unit_amount || 0;
      return sum + unitPrice * item.quantity;
    }, 0) || 0;

  // Calculate discount amount
  const discountAmount = (subtotal * discount) / 100;

  const total = (subtotal - discountAmount).toFixed(2);

  useEffect(() => {
    const stripePay = "https://wittynailtip.com/backend/pay-api.php";
    if (pay) {
      async function fetchData() {
        try {
          setIsLoading(true);
          const result = await fetchApi(stripePay);
          if (result.data.success) {
            window.location.href = result.data.url;
          } else {
            console.log(result.data.message);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    }
  }, [pay]);

  const emptyCart = async () => {
    const emptyCart = "https://wittynailtip.com/backend/empty-cart.php";
    try {
      const result = await fetchApi(emptyCart);
      if (result.data.success) {
        window.location.reload();
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-jost relative">
      {/* <ToastContainer position="bottom-center" autoClose={2000} /> */}
      <Navbar />
      {cart.length > 0 && (
        <div className="md:w-5/6 w-[90%] mx-auto flex justify-end mt-4">
          <button
            type="button"
            onClick={() => setShowCouponModal(true)}
            className="text-[#FFB7CF] border border-[#FFB7CF] px-4 py-2 rounded-lg hover:bg-[#fff1f5] transition"
          >
            Apply Coupon
          </button>
        </div>
      )}
      <div className="md:w-5/6 w-[90%] mx-auto mt-5 md:mt-7 h-full mb-20">
        <div className="w-full">
          {cart?.map((e, index) => (
            <div key={index}>
              <CartItem
                price={e.price?.unit_amount}
                size={e.size}
                cartId={e.cart_id}
                id={e.product_id}
                info={e.description}
                count={e.quantity}
                name={e.name}
                color={e.color}
                image={e.images?.[0] || ""}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="cart-footer flex items-center w-full fixed 
        bottom-0 h-16 bg-[#fff1f5] shadow-[0_-4px_7px_-1px_rgba(0,0,0,0.1)]"
      >
        {cart?.length > 0 ? (
          <div className="md:w-5/6 w-[95%] mx-auto flex items-center justify-between z-10 py-2">
            <div
              className={`${cart?.length > 0 && "!flex"} hidden md:text-lg 
                    text-sm font-semibold items-center gap-x-1 `}
            >
              {/* <input type="checkbox" 
                            className='accent-[#FFB7CF] w-4 h-4 md:h-5 md:w-5 !outline-none border !border-[#FFB7CF]'
                            name="cart-select" id="cart-select" 
                        />
                        <h4 className='font-bold md:text-xl text-lg'>ALL </h4> */}
              <button
                type="button"
                className="bg-red-300 flex justify-center items-center 
                        rounded-2xl cursor-pointer px-3 py-2"
                onClick={() => emptyCart()}
              >
                Empty cart
              </button>
            </div>

            <div className="flex flex-col items-center">
              {discount > 0 && (
                <p className="text-xs md:text-sm text-green-500">
                  {discount}% off (-${subtotal.toFixed(2)})
                </p>
              )}
              <h4 className="md:text-3xl font-bold text-base">USD {total}</h4>
            </div>

            <button
              type="button"
              onClick={() => payOrder()}
              className="md:text-lg text-xs uppercase cursor-pointer 
                        flex items-center justify-center text-center
                        text-white tracking-wide font-bold px-3 py-2 rounded-2xl bg-[#FFB7CF]"
            >
              {isLoading ? (
                <>
                  Processing...
                  <RiLoader4Fill className="animate-spin" />
                </>
              ) : (
                "Make Payment"
              )}
              <span>{`{${cart?.length}}`}</span>
            </button>
          </div>
        ) : !cart ? (
          <h3 className="md:w-5/6 w-[90%] pl-[10%] flex justify-start items-center gap-x-2 italic">
            You have no item in cart. Please{" "}
            <Link to="/">
              <span className="text-[#FFB7CF] cursor-pointer font-semibold">
                login
              </span>
            </Link>{" "}
            and check again!
          </h3>
        ) : (
          <div className="md:w-5/6 w-[90%] mx-auto flex items-center justify-between z-10 italic">
            <h3>Cart is empty. Start Shopping NOW!</h3>
          </div>
        )}
      </div>

      {showCouponModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-md:w-[90%] w-96">
            <h3 className="text-xl font-bold mb-4">Apply Coupon Code</h3>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full p-2 border rounded mb-4 outline-none"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowCouponModal(false);
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={validateCoupon}
                disabled={isCouponLoading}
                className="px-4 py-2 bg-[#FFB7CF] text-white rounded disabled:opacity-50"
              >
                {isCouponLoading ? "Validating..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
