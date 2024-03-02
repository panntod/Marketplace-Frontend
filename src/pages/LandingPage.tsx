import React, { FC } from "react";
import { MainLayout } from "../components/layouts";

const LandingPage: FC = () => {
	return (
		<MainLayout>
			<div className="flex flex-col items-center justify-center h-[80vh]">
				<div className="bg-gray-300 rounded-xl shadow-xl flex flex-col items-center justify-center p-28">
					<h1 className="text-4xl font-bold mb-4">Welcome to Our Website!</h1>
					<p className="text-gray-800 text-lg text-center">
						Explore our amazing features and services. Start your journey with us
						today.
					</p>
					<div className="mt-8">
						<a
							href="/auth/register"
							className="bg-primary-first text-white px-6 py-3 rounded-md hover:bg-primary-focus transition-all"
						>
							Get Started
						</a>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default LandingPage;
