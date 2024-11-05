"use client";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { TuserProps } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/get-token";
import { getUserData } from "@/utils/currentUser";

export default function Profile() {
	const token = getToken();
	const router = useRouter();
	const [user, setUser] = useState<TuserProps>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserData = async () => {
			const userData = await getUserData(token);
			setUser(userData);
			setLoading(false);
			if (!userData) {
				router.push("/login");
			}
		};
		fetchUserData();
	}, []);

	const logOut = () => {
		Cookies.remove("authToken");
		toast.success("Logged out");
		router.push("/login");
	};

	return (
		<>
			{loading && (
				<div>
					<h1 className="w-full h-screen flex items-center justify-center text-2xl font-semibold leading-tight tracking-tight text-black">
						Loading...
					</h1>
				</div>
			)}
			<div className="w-full">
				<div className="w-full fixed top-0 px-10 py-5 flex items-center justify-between bg-gray-200">
					<div>
						<h1 className="text-2xl font-semibold leading-tight tracking-tight text-black">
							DashBoard
						</h1>
					</div>
					<div>
						<button
							onClick={() => logOut()}
							className="text-lg bg-black px-4 py-2 rounded-lg text-white font-semibold leading-tight tracking-tight">
							Logout
						</button>
					</div>
				</div>
				<div className="flex flex-col gap-2 mt-40 p-10">
					<input
						className="text-lg text-black leading-tight tracking-tight bg-gray-200 rounded-lg px-4 py-2 w-fit"
						value={`Welcome, ${user?.name}`}
					/>
					<input
						className="text-lg text-black leading-tight tracking-tight bg-gray-200 rounded-lg px-4 py-2 w-fit"
						value={`Email: ${user?.email}`}
					/>
				</div>
			</div>
		</>
	);
}
