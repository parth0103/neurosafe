"use client";
import React from "react";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { googleAuth } from "../apis/auth";
import { useState } from "react";
import { loginUser } from "../apis/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs";
import { toast } from "react-toastify";
import { validUser } from "../apis/auth";
const defaultData = {
	email: "",
	password: "",
};
function Login() {
	const [formData, setFormData] = useState(defaultData);
	const [isLoading, setIsLoading] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const [userType, setUserType] = useState('User')
	const pageRoute = useRouter();
	const googleSuccess = async (res) => {
		if (res?.profileObj) {
			console.log(res.profileObj);
			setIsLoading(true);
			const response = await googleAuth({ tokenId: res.tokenId });
			setIsLoading(false);

			console.log("response :" + res);
			if (response.data.token) {
				localStorage.setItem("userToken", response.data.token);
				pageRoute.push("/chat");
			}
		}
	};
	const googleFailure = (error) => {
		// toast.error("Something went Wrong.Try Again!")
	};
	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const formSubmit = async (e) => {
		e.preventDefault();
        console.log(formData)
		if (formData.email.includes("@") && formData.password.length > 6) {
			setIsLoading(true);
			const { data } = await loginUser(formData);
			if (data?.token) {
				localStorage.setItem("userToken", data.token);
				toast.success("Succesfully Login!");
				setIsLoading(false);
				pageRoute.push("/chat");
			} else {
				setIsLoading(false);
				toast.error("Invalid Credentials!");
				setFormData({ ...formData, password: "" });
			}
		} else {
			setIsLoading(false);
			toast.warning("Provide valid Credentials!");
			setFormData(defaultData);
		}
	};
	useEffect(() => {
		const initClient = () => {
			gapi.client.init({
				clientId: process.env.REACT_APP_CLIENT_ID,
				scope: "",
			});
		};
		gapi.load("client:auth2", initClient);
		const isValid = async () => {
			const data = await validUser();
			if (data?.user) {
				window.location.href = "/chat";
			}
		};
		isValid();
	}, []);
	return (
		<>
			<div className="bg-[#121418] w-[100vw] h-[100vh] flex justify-center items-center">
				<div className="w-[90%] sm:w-[400px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-20 flex flex-col items-center justify-center space-y-3">
					{/* <img className='w-[100px] absolute -top-16 left-28' src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/78c4af118001599.608076cf95739.jpg" alt="" /> */}
					<div className="text-white text-3xl font-semibold">
						Login
					</div>
					<div className="flex flex-row justify-center items-center  w-80 text-lg">
						<div
							className={`w-40 text-center px-2 py-2 border-b-2  border-r-2 border-neurosafe-primary ${
								userType == "User"
									? "bg-neurosafe-primary text-black"
									: "text-white"
							} hover:bg-neurosafe-primary hover:text-black transition-all cursor-pointer`}
							onClick={() => {
								setUserType("User");
							}}
						>
							User
						</div>
						<div
							className={`w-40 text-center px-2 py-2 border-b-2  border-neurosafe-primary ${
								userType == "Therapist"
									? "bg-neurosafe-primary text-black"
									: "text-white"
							} hover:bg-neurosafe-primary hover:text-black transition-all cursor-pointer`}
							onClick={() => {
								setUserType("Therapist");
							}}
						>
							Therapist
						</div>
					</div>
					{/* <h2 className='text-2xl text-[#fff] font-bold tracking-wide my-6 text-center'>Login to your Account</h2> */}
					<form
						className="flex flex-col gap-y-3 w-full items-center justify-center"
						onSubmit={formSubmit}
					>
						<div className="w-80 flex items-center justify-center">
							<input
								className="w-full bg-[#222222] h-12 pl-3 text-[#ffff]"
								onChange={handleOnChange}
								name="email"
								type="text"
								placeholder="Email"
								value={formData.email}
								required
							/>
						</div>
						<div className="w-full flex items-center justify-center ">
							<input
								className="w-72 bg-[#222222] h-12 pl-3 text-[#ffff]"
								onChange={handleOnChange}
								type={showPass ? "text" : "password"}
								name="password"
								placeholder="Password"
								value={formData.password}
								required
							/>
							{!showPass ? (
								<button
									type="button"
									className="bg-[#222222] h-12"
								>
									<BsEmojiLaughing
										onClick={() => setShowPass(!showPass)}
										className="text-[#fff] h-[25px] w-8"
									/>
								</button>
							) : (
								<button
									type="button"
									className="bg-[#222222] h-12"
								>
									<BsEmojiExpressionless
										onClick={() => setShowPass(!showPass)}
										className="text-[#fff] h-[25px] w-8"
									/>
								</button>
							)}
						</div>

						<button
							className=" bg-neurosafe-primary  w-80 h-[50px] font-bold text-[#121418] tracking-wide text-[17px] border-2 border-neurosafe-primary hover:text-neurosafe-primary hover:bg-[#121418] transition-all duration-200 relative"
							type="submit"
						>
							<div
								style={{ display: isLoading ? "" : "none" }}
								className="absolute -top-[53px] left-[27%] sm:-top-[53px] sm:left-[56px]"
							>
								<lottie-player
									src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
									background="transparent"
									speed="1"
									style={{ width: "200px", height: "160px" }}
									loop
									autoplay
								></lottie-player>
							</div>
							<p
								style={{
									display: isLoading ? "none" : "block",
								}}
								className="test-[#fff]"
							>
								Login
							</p>
						</button>
						{/* <div className='border-t-[1px] w-[100%] sm:w-[80%] my-3' ></div> */}
						<GoogleLogin
							clientId={process.env.REACT_APP_CLIENT_ID}
							render={(renderProps) => (
								<button
									style={{
										borderImage:
											"linear-gradient(to right, rgba(0,195,154,1) 50%, rgba(224,205,115,1) 80%)",
										borderImageSlice: "1",
									}}
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
									aria-label="Continue with google"
									className="focus:ring-2 focus:ring-offset-1  py-3.5 px-4 border rounded-lg  flex items-center w-80 justify-center"
									disableElevation={true}
									disablefocusRipple={true}
								>
									<img
										src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
										alt="google"
									/>
									<p className="text-[base] font-medium ml-4 text-[#fff]">
										Continue with Google
									</p>
								</button>
							)}
							onSuccess={googleSuccess}
							onFailure={googleFailure}
							cookiePolicy={"single_host_origin"}
							scope="profile email https://www.googleapis.com/auth/user.birthday.read"
						/>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
