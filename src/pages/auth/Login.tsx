import React, { FC, useState } from "react";
import Swal from "sweetalert2";

import { CustomInput } from "../../components/input";
import { useNavigate } from "react-router-dom";

import { MainLayout, LoadingScreen } from "../../components/layouts"

import InputValidation from "../../helpers/InputValidation";
import Http from "../../helpers/Fetch";
import AuthUser from "../../helpers/AuthUser";
import AuthAttributes from "../../interface/AuthUserInterface";

interface DataLogin {
	email?: string | null,
	password?: string | null
}

const Login: FC = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<DataLogin>({
		email: '',
		password: '',
	});

	const [errData, setErrData] = useState<DataLogin>({
		email: '',
		password: ''
	});


	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const { name, value } = e.target;

		let strErr = ""
		if (name === "email") {
			strErr = InputValidation.EmailValidation(value, 100, "Email", true);
		}
		if (name === "password") {
			strErr = InputValidation.PasswordValidation(value, 4, 12, "Password", true);
		}

		setErrData({
			...errData,
			[name]: strErr
		});

		setData({
			...data,
			[name]: value
		});
	};

	const onSubmit = async () => {
		const valid = onValidation();
		if (valid) {
			setLoading(true)
			try {
				const response = await Http.post("/user/login", data, { withCredentials: true });
				const responseData: AuthAttributes = {
				  id: response.data?.data?.id,
				  name: response.data?.data?.name,
				  email: response.data?.data?.email,
				  roleId: response.data?.data?.roleId,
				  token: response.data?.data?.token,
				  menuAccess: response.data?.data?.menuAccess,
				};
				setData({
				  ...data,
				  email: "",
				  password: ""
				});
			  
				AuthUser.SetAuth(responseData);
				setLoading(false);
				navigate("/dashboard");
			  } catch (error: any) {
				console.log(error);
			  
				if (error.response && error.response.data && error.response.data.message) {
				  Swal.fire({
					icon: "error",
					text: error.response.data.message,
					title: "Oops!!"
				  });
				} else {
				  Swal.fire({
					icon: "error",
					text: "Invalid Credentials",
					title: "Oops!!"
				  });
				}
			  
				setLoading(false);
			  }
		}
	};

	const onValidation = (): boolean => {
		const tempValidation: DataLogin = {
			email: InputValidation.EmailValidation(data.email, 100, "Email", true),
			password: InputValidation.PasswordValidation(data.password, 4, 12, "Password", true)
		};

		setErrData(tempValidation);

		for (var key in tempValidation) {
			if ((tempValidation as any)[key] !== "") {
				return false;
			}
		}
		return true;
	};

	return loading ? (
		<LoadingScreen />
	) : (
		<MainLayout>
			<div className="w-full">
				<div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-xl mt-8">
				<h5 className="text-center text-3xl text-menu-label mb-8 font-semibold">Login</h5>
					<div className="mb-5 mt-12">
						<CustomInput
							name="email"
							label="Email"
							required={true}
							type="email"
							value={data.email ?? ''}
							error={errData.email}
							onChange={onChange}
						/>
					</div>
					<div className="mb-24">
						<CustomInput
							name="password"
							label="Password"
							required={true}
							type="password"
							value={data.password ?? ''}
							error={errData.password}
							onChange={onChange}
						/>
					</div>

					<div className="flex flex-col sm:flex-row justify-between items-center">
						<p className="text-sm text-gray-500 mb-3 sm:mb-0">Don't have an account? <span className="text-secondary-50 cursor-pointer" onClick={() => navigate("/auth/register")}>Register Here</span></p>
						<button onClick={onSubmit} className="btn btn-primary w-full sm:w-auto normal-case">
							Login
						</button>
					</div>
				</div>
			</div>
		</MainLayout>

	)
};

export default Login;