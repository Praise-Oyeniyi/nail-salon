import React from "react";

const Loader = ({ what }) => {
	return (
		<div className="w-full h-full flex justify-center items-center text-2xl italic text-black">
			Please hold on. {what} loading...
		</div>
	);
};

export default Loader;
