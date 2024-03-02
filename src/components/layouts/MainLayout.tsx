import React, { FC } from "react";
import { useNavigate } from 'react-router-dom';

import Logo from "../../assets/logo/logo2.png";

interface MainLayoutAttributes {
	children: React.ReactNode
}

const MainLayout: FC<MainLayoutAttributes> = ({ children }) => {
	const navigate = useNavigate();
	return (
		<div className="w-full min-h-screen">
			<div className="fixed inset-x-0 top-0 h-20 bg-primary-first">
				<div className="container mx-auto flex items-center justify-between h-full">
					<a href="/" className="flex items-center">
						<img src={Logo} alt="logo" className="h-10 w-auto" />
					</a>
					<nav className="flex items-center">
						<ul className="flex gap-x-5">
							<li>
								<div
									onClick={() => navigate("/auth/login")}
									className="cursor-pointer px-6 py-4 text-white transition-all hover:bg-primary-focus rounded-md text-xl"
								>
									<p>Login</p>
								</div>
							</li>
							<li>
								<div
									onClick={() => navigate("/auth/register")}
									className="cursor-pointer px-6 py-4 text-white transition-all hover:bg-primary-focus rounded-md text-xl"
								>
									<p>Register</p>
								</div>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<main className="pt-20">{children}</main>
		</div>
	);
};

export default MainLayout;