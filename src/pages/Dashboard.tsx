import React, { FC } from "react";

import { AuthLayout } from "../components/layouts";

const Dashboard: FC = () => {

	return (
		<AuthLayout>
			<div className="mx-4 mt-12">
				<h2 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h2>

				<div className="flex justify-between items-center mb-6">
					<p className="text-lg text-gray-600">Selamat datang di Dashboard!</p>
				</div>
			</div>
		</AuthLayout>

	)
}

export default Dashboard;