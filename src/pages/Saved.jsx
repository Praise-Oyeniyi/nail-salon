import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-hot-toast";
import { fetchApi } from "../apis/Index";
import SavedItem from "../components/Cart/SavedItem";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { CartContextProvider } from "../context/CartContext";

const Saved = () => {
    const { savedItems, favError } = useContext(CartContextProvider);
    const [load, setLoad] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        if (savedItems) {
            setLoad(true);
            setLoadingComplete(true);
        }
    }, [savedItems]);

    useEffect(() => {
        if (favError) {
            toast.error(favError);
        }
    }, [favError]);

    const deleteSaved = async () => {
        const deleteSavedApi = "https://wittynailtip.com/backend/empty-fav.php";
        try {
            const result = await fetchApi(deleteSavedApi);
            if (result.data.success) {
                window.location.reload();
            } else {
                console.log(result.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const validSavedItems = savedItems?.filter(
        (item) => !item.error && item.prices?.[0]?.unit_amount !== undefined,
    );

    return (
        <div className="font-jost">
            <ToastContainer position="bottom-center" autoClose={2000} />
            <Navbar />
            <div className="md:w-5/6 w-[90%] mx-auto mt-5 md:mt-7 h-full mb-20">
                <div className="w-full">
                    {!loadingComplete ? (
                        <Loader what={"Your saved items are"} />
                    ) : validSavedItems?.length > 0 ? (
                        validSavedItems.map((item) => (
                            <SavedItem
                                key={item.fav_id}
                                price={item.prices[0].unit_amount}
                                id={item.id}
                                info={item.description}
                                name={item.name}
                                color={item.color}
                                image={item.images?.[0]}
                                item={item}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <div className="flex items-center justify-center">
                                <img src="/empty.png" alt="empty cart" className="w-20" />
                            </div>
                            <h3 className="italic mb-4">
                                {savedItems?.some((item) => item.error)
                                    ? "Some items couldn't be loaded"
                                    : "You have no saved items"}
                            </h3>
                            <Link
                                to="/"
                                className="mt-8 px-4 py-2 bg-[#FFB7CF] text-white rounded-lg hover:bg-[#ff9cbb] transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {validSavedItems?.length > 0 && (
                <div className="cart-footer flex items-center w-full fixed bottom-0 h-16 bg-[#fff1f5] shadow-[0_-4px_7px_-1px_rgba(0,0,0,0.1)]">
                    <div className="md:w-5/6 w-[90%] mx-auto flex items-center justify-between z-10">
                        <button
                            type="button"
                            className="bg-[#FFB7CF]/10 hover:bg-[#FFB7CF]/20 text-red-500 flex justify-center items-center rounded-2xl cursor-pointer px-3 py-1"
                            onClick={deleteSaved}
                        >
                            Delete All Saved Items
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Saved;