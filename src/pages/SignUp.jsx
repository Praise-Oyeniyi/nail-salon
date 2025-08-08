import React from "react";
import Welcome from "../components/Welcome";
import FooterSection from "../components/Footer";

// #ffb7ce #cccccc #fff1f5 #FFB7CF
const SignUp = () => {
	return (
		<div className="bg-[#fff1f5] w-full h-screen overflow-hidden max-h-screen font-jost">
			<Welcome />
			<FooterSection />
		</div>
	);
};

export default SignUp;
