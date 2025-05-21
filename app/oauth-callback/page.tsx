"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OAuthCallback() {
	const router = useRouter();

	useEffect(() => {
		// Get token from URL query parameters
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get("token");

		if (token) {
			// Store token in cookies
			Cookies.set("authToken", token, { expires: 1 });
			toast.success("Login successful");

			// Redirect to dashboard
			// Note: You might want to fetch user role first if needed
			router.push("/user-dashboard");
		} else {
			toast.error("Login failed");
			router.push("/");
		}
	}, [router]);

	return (
		<div className="flex items-center justify-center h-screen">
			<p>Processing login...</p>
		</div>
	);
}
