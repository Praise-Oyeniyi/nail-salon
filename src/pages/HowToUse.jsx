import React from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/Footer";

const HowToUse = () => {
	return (
		<div className="font-jost">
			<Navbar />
			<div
				className="w-full max-md:pt-8 max-md:pb-20 mx-auto
        md:h-screen md:flex md:items-center md:justify-center"
			>
				<img
					src="/how-to-use.jpg"
					alt="how to use"
					className="w-[90%] md:w-full h-[90%] object-contain mx-auto"
				/>
			</div>
			<FooterSection />
		</div>
	);
};

export default HowToUse;
