"use client";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { ProfileForm } from "@/components";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
	const router = useRouter();

	const logOut = () => {
		Cookies.remove("authToken");
		toast.success("Logged out");
		router.push("/");
	};

	return (
		<div className="w-full h-screen">
			<div className="w-full px-5 py-5 flex items-center justify-between gap-5">
				<p className="text-lg leading-tight tracking-tight px-5 py-3 rounded-md bg-black text-white">
					Admin Dashboard
				</p>
				<button
					onClick={logOut}
					className="text-lg leading-tight tracking-tight px-5 py-3 rounded-md bg-black text-white">
					LogOut
				</button>
			</div>
			<ProfileForm />
		</div>
	);
}
