import React from "react";
import { RxAvatar } from "react-icons/rx";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { RiMapLine } from "react-icons/ri";

const OrderSide = ({ user }) => {
	return (
		<div className="w-full text-sm font-medium space-y-2">
			<div className="space-y-1 border border-gray-300 rounded-lg px-3 py-1">
				<h5 className="font-bold md:text-xl text-basefont-bold text-base first-line:">
					Notes
				</h5>
				<textarea
					className="outline-none bg-transparent border-none"
					name="note"
					id="note"
					cols="30"
					rows="3"
					placeholder="Drop a note"
				></textarea>
			</div>

			<div className="space-y-1 border border-gray-300 rounded-lg px-3 py-1">
				<h5 className="font-bold md:text-xl text-base">Customer</h5>
				<div className="space-y-1 text-sm md:text-base">
					<div className="flex items-center gap-x-1">
						<RxAvatar className="md:text-lg" />
						<h6>{user?.full_name}</h6>
					</div>

					<div className="flex items-center gap-x-1">
						<IoBagCheckOutline className="md:text-lg" />
						<h6>{"1"} Order</h6>
					</div>

					<p className="md:text-base text-xs">Customer is tax-exempt</p>
				</div>
			</div>

			<div className="space-y-1 text-xs border border-gray-300 rounded-lg px-3 py-1">
				<h5 className="font-bold md:text-xl text-base">Contact Information</h5>
				<div className="space-y-1 text-sm md:text-base">
					<div className="flex items-center gap-x-1">
						<CiMail className="md:text-lg" />
						<h6 className="w-5/6 truncate">{user?.email}</h6>
					</div>

					<div className="flex items-center gap-x-1">
						<h6 className="font-bold">Phone No:</h6>
						<h6>{user?.phone_number}</h6>
					</div>
				</div>
			</div>

			<div className="space-y-1 border border-gray-300 rounded-lg px-3 py-1">
				<h5 className="font-bold md:text-xl text-base">Shipping Address</h5>
				<div className="space-y-1 text-sm md:text-base">
					<div className="flex items-center gap-x-1">
						<RxAvatar className="md:text-lg" />
						<h6 className="w-5/6 truncate">{user?.full_name}</h6>
					</div>

					<div className="text-sm md:text-base">
						<p className="w-5/6 truncate">{user?.billing_address}</p>
						<h6 className="font-bold text-[#FFB7CF] flex items-center gap-x-1">
							<span className="md:text-lg">
								<RiMapLine />
							</span>
							View Map
						</h6>
					</div>
				</div>
			</div>

			<div className="space-y-1 border text-sm md:text-base border-gray-300 rounded-lg px-3 py-1">
				<h5 className="text-sm md:text-base">Billing Address</h5>
				<p>Same as shipping address</p>
			</div>

			<div className="space-y-1 border border-gray-300 rounded-lg px-3 py-1">
				<h5 className="font-bold md:text-xl text-base">Conversion Summary</h5>
				<div className="space-y-1">
					<p className="w-4/6">No Converstaion details for this order</p>
					<h6 className="font-bold text-[#FFB7CF]">Learn More</h6>
				</div>
			</div>
		</div>
	);
};

export default OrderSide;
