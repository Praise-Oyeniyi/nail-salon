import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProfileLoader from "../components/ProfileLoader";
import { fetchApi, sendApi } from "../apis/Index";
import { toast } from "react-hot-toast";

const EditProfile = () => {
	const [side, setSide] = useState(false);
	const [user, setUser] = useState(null);
	const [edit, setEdit] = useState(false);
	const [load, setLoad] = useState(true); // Changed to true initially
	const [update, setUpdate] = useState(false);
	const [unauthorized, setUnauthorized] = useState(false);

	useEffect(() => {
		const profileApi = "https://wittynailtip.com/backend/profile.php";
		async function fetchData() {
			setLoad(true);
			try {
				const response = await fetch(profileApi, {
					credentials: "include",
				});
				const result = await response.json(); // Parse the JSON response

				if (result.status === "unauthorized") {
					setUnauthorized(true);
					toast.error(result.message);
				} else if (result.status) {
					setUser(result.data);
				} else {
					toast.error(result.message);
					setUser(null);
				}
				setLoad(false);
			} catch (error) {
				console.error(error);
				setLoad(false);
			}
		}
		fetchData();
	}, []);

	const UpdateProfile = async (e) => {
		setUpdate(true);
		e.preventDefault();
		const full_name = e.target.name.value || user?.full_name;
		const username = user?.username;
		const phone_number = e.target.phone.value || user?.phone_number;
		const email = user?.email;
		const billing_address = e.target.address.value || user?.billing_address;

		const updatedProfile = {
			name: full_name,
			username: username,
			number: phone_number,
			email: email,
			billing: billing_address,
		};
		const updateProfileApi =
			"https://wittynailtip.com/backend/edit-profile.php";
		try {
			const result = await sendApi(updatedProfile, updateProfileApi);
			if (result.data.success) {
				toast.success(result.data.message);
			} else {
				toast.error(result.data.message);
			}
			setUpdate(false);
			setEdit(false);
		} catch (error) {
			console.error(error.message);
		}
	};

	const Logout = async (e) => {
		e.preventDefault();
		const logoutApi = "https://wittynailtip.com/backend/logout.php";
		try {
			const result = await fetchApi(logoutApi);
			if (result.data.success) {
				toast.success("Logout successful");
				window.location.reload();
				console.log(result);
			} else {
				console.log(result.data.message || result.data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-full md:flex justify-start items-start overflow-x-hidden font-jost">
			<div className="px-3 h-14 flex justify-between items-center lg:hidden">
				<button
					type="button"
					className="cursor-pointer p-2"
					onClick={() => setSide(!side)}
				>
					<div className="w-5 h-1 bg-black mb-[2px]"></div>
					<div className="w-5 h-1 bg-[#FFB7CF] ml-1"></div>
				</button>
			</div>
			<div className="hidden lg:block">
				<Sidebar open={true} noSearch={true} />
			</div>
			<div className="">
				<Sidebar open={side} noSearch={true} />
			</div>

			<div className="profile-outer w-full md:py-7 py-3 px-5 mx-auto lg:ml-[25%] z-[999]">
				{load ? (
					<ProfileLoader />
				) : unauthorized ? (
					<div className="flex items-center justify-center h-screen w-full">
						<div>
							<div className="flex items-center justify-center">
								<img
									src="/login.png"
									alt="unauthorized user"
									className="w-20"
								/>
							</div>
							<h3 className="flex flex-col justify-start items-center gap-x-2 italic">
								You are not logged in. Please
								<Link
									to="/auth?login=true"
									className="mt-2 px-4 py-2 bg-[#FFB7CF] text-white rounded-lg hover:bg-[#ff9cbb] transition-colors"
								>
									<span className="cursor-pointer font-semibold">login</span>
								</Link>{" "}
								to view your profile
							</h3>
						</div>
					</div>
				) : (
					<div className="profile-inner space-y-3">
						<h3 className="font-semibold md:text-2xl text-lg">Profile</h3>
						<div className="pic-btn flex space-x-7">
							<div className="img-box rounded-full h-32 w-32 overflow-hidden flex justify-center items-center flex-shrink-0">
								<img
									alt="logo"
									src="/logo.webp"
									className="w-full h-full object-cover"
								/>
							</div>

							<div className="btn flex md:flex-row flex-col justify-center gap-y-2 md:justify-start items-center md:space-x-3 text-white font-medium">
								<button
									type="button"
									className="bg-[#FFB7CF] text-gray-800 p-2 px-3 rounded-full text-base"
									onClick={() => setEdit(true)}
								>
									Edit Profile
								</button>
							</div>
						</div>

						<div className="profile-form">
							<form
								action=""
								className="profile-details space-y-5 md:w-4/6 w-full mx-auto md:mx-0"
								onSubmit={(e) => UpdateProfile(e)}
							>
								<div className="profile-name">
									<label
										htmlFor="name"
										className="block text-[#5f5f5f] font-semibold text-base"
									>
										FullName
									</label>
									<input
										disabled={!edit && true}
										type="text"
										name="name"
										id="name"
										className="h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder"
										placeholder={user?.full_name}
									/>
								</div>

								<div className="profile-uname">
									<label
										htmlFor="uname"
										className="block text-[#5f5f5f] font-semibold text-base"
									>
										Username
									</label>
									<input
										disabled
										type="text"
										name="uname"
										id="uname"
										className="h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder"
										placeholder={user?.username}
									/>
									<i className="text-[#cccccc] text-xs pl-3 font-medium">
										Available change in 05/30
									</i>
								</div>

								<div className="profile-address">
									<label
										htmlFor="address"
										className="block text-[#5f5f5f] font-semibold text-base"
									>
										Billing Address
									</label>
									<input
										disabled={!edit && true}
										type="text"
										name="address"
										id="address"
										className="h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder"
										placeholder={user?.billing_address}
									/>
								</div>

								<div className="profile-email">
									<label
										htmlFor="email"
										className="block text-[#5f5f5f] font-semibold text-base"
									>
										Email
									</label>
									<input
										disabled
										type="text"
										name="email"
										id="email"
										className="h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder"
										placeholder={user?.email}
									/>
								</div>

								<div className="profile-phone">
									<label
										htmlFor="phone"
										className="block text-[#5f5f5f] font-semibold text-base"
									>
										Phone No
									</label>
									<input
										disabled={!edit && true}
										type="text"
										name="phone"
										id="phone"
										className="h-8 text-lg w-full border boder-[#cccccc] rounded-md px-3 outline-none text-black placeholder-black placeholder"
										placeholder={user?.phone_number}
									/>
								</div>

								<div className="submit-btns pt-3 flex justify-start items-center space-x-3 text-white font-medium">
									{edit ? (
										<button
											type="submit"
											className="bg-[#ffb7ce] p-2 px-3 rounded-full text-sm flex gap-x-2 items-center justify-center"
										>
											Update Profile
											<AiOutlineLoading3Quarters
												className={`animate-spin ${
													update ? "block" : "hidden"
												}`}
											/>
										</button>
									) : (
										<>
											{/* <button
                        type='button'
                        className="bg-[#FFB7CF]/20 hover:bg-[#FFB7CF]/30 text-[#FFB7CF] border border-[#FFB7CF] p-2 px-3 rounded-full text-sm transition-colors"
                      >
                        Reset Password
                      </button> */}
											<button
												type="button"
												className="bg-[#FFB7CF]/10 hover:bg-[#FFB7CF]/20 text-red-500 p-2 px-3 rounded-full text-sm"
												onClick={(e) => Logout(e)}
											>
												Logout
											</button>
										</>
									)}
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default EditProfile;
