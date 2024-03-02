import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom"
import Header from "./Header";
import Sidebar from "./Sidebar";
import Http from "../../helpers/Fetch";
import LoadingScreen from "./LoadingScreen";
import AuthUser from "../../helpers/AuthUser";

interface AuthLayoutProps {
	children: React.ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
	const navigate = useNavigate();
	const user = AuthUser.GetAuth();
	const [open, setOpen] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [userData, setUserData] = useState<any | null>(null);

	const logout = async () => {
		setLoading(true)
		try {
			await Http.get("/user/logout", { withCredentials: true, headers: { 'Authorization': `Bearer ${user?.token}` } });

			AuthUser.RemoveAuth();
			navigate("/auth/login");
			setLoading(false);
		} catch (error: any) {
			console.log(error?.response);
			setLoading(false);
		}
	}

	const GetCurrentUser = async () => {
		try {
			const res = await Http.get("/user/currentUser", { headers: { 'Authorization': `Bearer ${user?.token}` } });

			setUserData(res.data.data);
			setOpenModal(true);
		} catch (error: any) {
			console.log(error);
		}
	};

	const closeModal = () => {
		setOpenModal(false);
		setUserData(null);
	};

	return loading ? (
		<LoadingScreen />
	) : (
		<div className="flex relative bg-gray-100 overflow-x-hidden min-h-screen antialiased">
			<Sidebar open={open} closeMenu={() => setOpen(!open)} />
			<div className="w-full relative ml-0 lg:ml-64">
				<Header logout={logout} changeOpen={() => setOpen(!open)} getCurrentUser={GetCurrentUser} />
				<main className="w-full mt-16">
					{children}
				</main>
			</div>

			{userData && openModal && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-8 max-w-md w-full rounded-md shadow-lg">
						<h2 className="text-2xl font-bold mb-4">User Data</h2>

						<div className="text-gray-900">
							<p className="mb-2">
								<span className="font-semibold">Name:</span> {userData.name}
							</p>
							<p className="mb-2">
								<span className="font-semibold">Email:</span> {userData.email}
							</p>
							<p className="mb-2 ">
								<span className="font-semibold">Role:</span> {userData.Role.roleName}
							</p>
							<p className="mb-2 font-semibold">
								Active: {userData.active ? <span className="text-green-400">Active</span> : <span className="text-red-400">Non Active</span>}
							</p>
							<p className="mb-2 font-semibold">
								Verified: {userData.verified ?  <span className="text-green-400">Verified</span> : <span className="text-red-400">Non Verified</span>}
							</p>
						</div>

						<button onClick={closeModal} className="mt-4 btn btn-secondary">Close</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default AuthLayout;
