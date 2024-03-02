import React, { FC } from "react";
import HeaderProps from "../../interface/HeaderInterfaces";

const Header: FC<HeaderProps> = ({ logout, changeOpen, getCurrentUser }) => {

	return (
		<div className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-primary shadow-lg flex justify-between items-center px-8">
			<div className="flex items-center gap-x-4">
				<button onClick={changeOpen} className="lg:hidden btn bg-blue-500 hover:bg-blue-600 border-0 text-white px-4 py-2 rounded-xl text-sm normal-case mr-4">
					Show
				</button>
				<p className="text-lg font-semibold text-white">Header</p>
			</div>
			<div>
				<button
					onClick={getCurrentUser}
					className="btn bg-green-500 hover:bg-green-600 border-0 text-white px-4 py-2 rounded-xl text-sm mr-4 transition duration-300"
				>
					Get Current User
				</button>
				<button
					className="btn bg-red-500 hover:bg-red-600 border-0 text-white px-4 py-2 rounded-xl transition duration-300"
					onClick={logout}
				>
					Logout
				</button>
			</div>
		</div>
	);
}

export default Header;