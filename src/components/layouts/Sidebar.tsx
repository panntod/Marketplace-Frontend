import React, { FC } from "react";
import AuthUser from "../../helpers/AuthUser";
import { Link } from "react-router-dom"

interface SidebarProps {
	open: boolean,
	closeMenu: () => void
}

const Sidebar: FC<SidebarProps> = ({ open, closeMenu }) => {
	const user = AuthUser.GetAuth();

	return (
		<div className={`fixed w-full lg:w-64 h-screen bg-gray-800 text-white transform transition-all duration-300 z-20 lg:translate-x-0 overflow-y-auto ${open ? 'translate-x-0' : '-translate-x-full'}`}>
			<div className="absolute top-3 right-3">
				<button onClick={closeMenu} className="inline-block lg:hidden text-white focus:outline-none">
					Close
				</button>
			</div>
			<div className="pt-20">
				{user?.menuAccess?.map((item, index) => (
					<div key={`menu-${index}`} className="mb-4">
						<p className="text-gray-400 uppercase text-sm font-semibold mb-2 ml-2">{item?.name}</p>
						{item?.Submenus?.map((sub: any, index: any) => (
							<Link
								key={`submenu-${index}`}
								to={sub?.url}
								className="block px-4 py-2 text-sm hover:bg-gray-700 transition duration-300 rounded"
							>
								{sub?.name}
							</Link>
						))}
					</div>
				))}
			</div>
		</div>

	)
};

export default Sidebar;