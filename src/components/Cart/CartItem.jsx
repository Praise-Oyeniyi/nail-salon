import { useContext } from "react";
import { CartContextProvider } from "../../context/CartContext";
import { IoClose } from "react-icons/io5";

const CartItem = ({
	image,
	count,
	name,
	price,
	info,
	color,
	size,
	// id,
	cartId,
}) => {
	const { deleteCartItem } = useContext(CartContextProvider);

	return (
		<div className="w-full flex items-center gap-x-3 border-b border-b-gray-300 relative">
			{/* <input type="checkbox" 
          className='accent-[#FFB7CF] w-4 h-4 md:h-5 md:w-5 !outline-none border !border-[#FFB7CF]'
          name="cart-select" id="cart-select" onChange={(e)=>{}}
      />
                     */}
			<div className="md:py-3 py-2">
				<div className="flex items-center gap-x-3 md:gap-x-5 relative">
					<div className="shadow-lg w-[10em] md:w-[7em] md:h-[7em] bg-[#fff1f5] shadow-gray-300 rounded-xl overflow-hidden">
						<img src={image} alt="" className="w-full h-full object-cover" />
					</div>

					<div className="md:space-y-1 relative">
						<h4 className="md:text-xl text-lg font-bold">{name}</h4>
						<p className="md:text-base text-sm text-gray-700 leading-tight md:leading-normal tracking-tight lg:tracking-normal">
							{info}
						</p>
						<div className="flex gap-x-3">
							<p className="cursor-pointer my-1 md:my-0 color w-fit text-sm  px-2 rounded-xl shadow-sm shadow-gray-400">
								{color}
							</p>
							<p className="cursor-pointer my-1 md:my-0 color w-fit text-sm  px-2 rounded-xl shadow-sm shadow-gray-400">
								{size}
							</p>
						</div>
						<div className="flex gap-x-3 items-center">
							<h5 className="md:text-xl text-lg font-bold">${price}</h5>
							<div className="font-bold text-base bg-[#fff1f5] text-black flex rounded-2xl items-center gap-x-5 px-3 py-1 opacity-0">
								<button type="button">-</button>
								<h3>{count}</h3>
								<button type="button">+</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button
			type="button"
				className="absolute top-0 right-0 p-2 cursor-pointer"
				onClick={() => deleteCartItem(cartId)}
			>
				<IoClose className=" text-red-500 text-2xl font-semibold " />
			</button>
		</div>
	);
};

export default CartItem;
