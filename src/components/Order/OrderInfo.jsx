import React from "react";

// #ffb7ce #cccccc #fff1f5 #FFB7CF
const OrderInfo = ({ ordered }) => {
	return (
		<div className="w-full">
			<div className="w-full border border-gray-200 rounded-md">
				<div className="w-full md:px-5 p-1 md:py-3 py-2">
					<h4 className="font-bold md:text-xl text-base">Order Item</h4>
					<h5 className="state  ml-2 font-medium w-fit text-[#FFB7CF] md:tracking-wider px-1 text-xs md:text-sm bg-[#fff1f5]">
						{ordered.status}
					</h5>
					{!ordered.tracking === "paid" && (
						<p className="md:text-sm text-xs font-medium">
							Make payment for your goods and get your items
						</p>
					)}

					<div className="order-item w-full my-3">
						<div className="order-item-in w-full ">
							<div className="flex w-full justify-between">
								<div className="left flex gap-x-2">
									<div className="image bg-black overflow-hidden md:h-14 h-10 w-10 md:w-14">
										{ordered.images && (
											<img src={ordered.images[0]} alt="" className="w-full h-full object-cover" />
										)}
									</div>
									<div className="text-sm">
										<h6 className="item text-[#cccccc] text-xs md:sm w-5/6 truncate">
											{ordered.description}
										</h6>
										<h4 className="Item-name font-bold">{ordered.name}</h4>
										<div className="colors gap-x-1 text-xs flex font-medium">
											<button className="border border-[#cccccc] px-2 max-w-fit">
												Glossy
											</button>
											<button className="border border-[#cccccc] px-2 max-w-fit">
												{ordered.color}
											</button>
											<div className="color-picked bg-black w-5 h-inherit"></div>
										</div>
									</div>
								</div>
								<div className="right self-end flex items-center justify-center gap-x-1 md:gap-x-3 text-xs md:text-sm">
									<button className="amount border border-gray-700 w-16 md:w-20 rounded-md text-center font-medium">
										{ordered.quantity} piece
									</button>
									<p className="cost border border-gray-600 w-12 md:w-16 rounded-md text-center font-medium">
										${ordered?.initial_price?.unit_amount}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full h-10 flex items-center bg-[#ffb7ce]">
					<div className="md:px-5 w-full px-2 mx-auto flex font-medium text-xs md:text-sm justify-between items-center py-1">
						<p className="text-gray-500 tracking-tight md:tracking-normal w-3/6 md:w-auto">
							Effectively manage your order in our order page
						</p>
						{/* <button className='rounded-xl px-1 md:px-2 py-1 text-gray-100 tracking-tight md:tracking-normal bg-[#FFB7CF]'>Create Shipping Label</button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderInfo;
