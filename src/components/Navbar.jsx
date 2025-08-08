import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Logo from "../images/logo.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setProductName }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [side, setSide] = useState(false);
	const isHomepage = location.pathname === "/";

	const handleSearchChange = (e) => setProductName(e.target.value);

	return (
		<nav className="w-full mb-5 bg-white shadow-sm sticky top-0 z-50">
			{/* Desktop Navbar */}
			<div className="hidden lg:flex container mx-auto px-4 py-3 items-center justify-between">
				{/* Logo */}
				<Link to="/" className="flex items-center">
					<img src={Logo} alt="Logo" className="h-10 w-10 rounded-full" />
				</Link>

				{/* Search Bar */}
				{isHomepage && (
					<div className="relative w-1/3 mx-4">
						<input
							type="text"
							placeholder="Search products..."
							className="w-full py-2 px-4 pr-10 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm"
							onChange={handleSearchChange}
						/>
						<CiSearch className="absolute right-3 top-2.5 text-gray-400 text-lg" />
					</div>
				)}

				{/* Navigation Links */}
				<div className="flex items-center space-x-6">
					<Link
						to="/saved"
						className="text-gray-700 hover:text-pink-500 text-sm font-medium"
					>
						Saved
					</Link>
					<Link
						to="/order"
						className="text-gray-700 hover:text-pink-500 text-sm font-medium"
					>
						Orders
					</Link>
					<Link
						to="/how-to-use"
						className="text-gray-700 hover:text-pink-500 text-sm font-medium"
					>
						How to use
					</Link>

					<div className="relative">
						<select
							onChange={(e) => navigate(`/categories/${e.target.value}`)}
							className="appearance-none bg-gray-50 border-0 py-2 px-3 pr-8 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
						>
							<option value="" disabled selected>
								Categories
							</option>
							<option value="handmade">Handmade Nails</option>
							<option value="machine">Mechanical Nails</option>
							<option value="accessory">Accessories</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg
								className="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<title>Svg</title>
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>

					<Link
						to="/cart"
						className="flex items-center text-gray-700 hover:text-pink-500"
					>
						<FaShoppingCart className="mr-1" />
						<span className="text-sm font-medium">Cart</span>
					</Link>

					<Link
						to="/edit-profile"
						className="flex items-center text-gray-700 hover:text-pink-500"
					>
						<FaRegUserCircle className="mr-1" />
						<span className="text-sm font-medium">Account</span>
					</Link>

					{/* {city && (
                        <div className="flex items-center text-gray-700">
                            <CiLocationOn className="mr-1" />
                            <span className="text-xs">{city}</span>
                        </div>
                    )} */}
				</div>
			</div>

			{/* Mobile Navbar */}
			<div className="lg:hidden bg-white shadow-sm">
				<div className="container mx-auto px-4 py-3 flex justify-between items-center">
					<button
						type="button"
						onClick={() => setSide(!side)}
						className="p-2 focus:outline-none"
					>
						<div className="w-5 space-y-1">
							<div className="h-0.5 bg-black"></div>
							<div className="h-0.5 bg-pink-500"></div>
							<div className="h-0.5 bg-black"></div>
						</div>
					</button>

					<Link to="/" className="flex-1 flex justify-center">
						<img src={Logo} alt="Logo" className="h-8 w-8 rounded-full" />
					</Link>

					<div className="flex items-center space-x-4">
						<Link to="/cart" className="text-gray-700">
							<FaShoppingCart />
						</Link>
						{/* {city && (
                            <div className="flex items-center text-gray-700">
                                <CiLocationOn />
                            </div>
                        )} */}
					</div>
				</div>

				{/* Mobile Search */}
				<div className="px-4 pb-3">
					<div className="relative">
						<input
							type="text"
							placeholder="Search products..."
							className="w-full py-2 px-4 pr-10 rounded-full bg-gray-50 focus:outline-none text-sm"
							onChange={handleSearchChange}
						/>
						<CiSearch className="absolute right-3 top-2.5 text-gray-400 text-lg" />
					</div>
				</div>

				{/* Mobile Sidebar */}
				<Sidebar
					open={side}
					setSide={setSide}
					setProductName={setProductName}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
