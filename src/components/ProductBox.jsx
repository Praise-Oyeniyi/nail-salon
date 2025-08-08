import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContextProvider } from "../context/CartContext";

const ProductBox = ({ image, id, name, price, alt, item }) => {
	const [like, setLike] = useState(false);
	const { addToSave, favCheckError } = useContext(CartContextProvider);

	const handleLikeAndSave = (item) => {
		const newLikeState = !like;

		addToSave(item, newLikeState);
		if (!favCheckError) {
			setLike(newLikeState);
		}
	};

	return (
		<div className="w-full shadow-md shadow-gray-200">
			<div className="image relative bg-[#fff1f5] min-w-full">
				<Link to={`/details/${id}`}>
					<img
						src={image}
						alt={alt}
						className="min-w-full min-h-[10em] max-h-[10em]
                 object-center object-cover md:min-h-[18em] md:max-h-[18em] flex justify-center items-center"
					/>
				</Link>
				<button
					type="button"
					className="bg-[#FFB7CF] p-2 text-sm md:text-base absolute top-3 right-3 w-fit rounded-full"
					onClick={() => handleLikeAndSave(item)}
				>
					<FaHeart className={`${like ? "text-red-700" : "text-[#fff1f5]"}`} />
				</button>
			</div>
			<div className="pd-info font-medium py-3 pb-5 px-2 md:mt-0">
				<div className="flex flex-col gap-y-1">
					<div className="flex items-start justify-between gap-x-4">
						<h4
							className="text-base md:text-lg tracking-tight md:tracking-normal 
                    font-semibold uppercase truncate"
						>
							{name}
						</h4>
						<h4
							className="text-base md:text-xl flex-shrink-0
                    font-light"
						>
							${price}
						</h4>
					</div>

					{/* <p className='text-xs md:text-base truncate font-normal'>{info}</p> */}

					{/* <div className='ratings flex items-center gap-x-2 pt-1'>
                    <div className='flex cursor-pointer gap-x-1 text-[#FFB7CF] text-xs md:text-base truncate'>{[1,2,3,4,5].map((e,index)=>(<FaRegStar key={index}/>))}</div>
                    <h6 className='text-xs font-normal flex-shrink-0'>(In stock)</h6>
                </div> */}

					<Link to={`/details/${id}`}>
						<button
							type="button"
							className="flex px-2 py-1 md:px-3 mt-2 font-normal
                    w-fit rounded-2xl text-xs border border-[#FFB7CF7e]"
						>
							Add to Cart
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductBox;
