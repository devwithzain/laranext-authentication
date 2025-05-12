"use client";
import axios from "axios";
import Image from "next/image";
import { formimg } from "@/public";
import toast from "react-hot-toast";
import { TuserProps } from "@/types";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { getToken } from "@/lib/get-token";
import { useEffect, useState } from "react";
import { getUserData } from "@/lib/get-user";
import useLoginModal from "@/hooks/use-login-modal";
import useResetCodeStore from "@/hooks/useResetCodeStore";
import { Eye, EyeOff, Loader2, Lock, X } from "lucide-react";
import useNewPasswordModal from "@/hooks/use-newPassword-modal";

export default function NewPassword({ onClose }: { onClose: () => void }) {
	const token = getToken();
	const loginModal = useLoginModal();
	const { code } = useResetCodeStore();
	const newPasswordModal = useNewPasswordModal();
	const [user, setUser] = useState<TuserProps>();
	const [newPassword, setNewPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [currentPassword, setCurrentPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);

	useEffect(() => {
		const fetchUserData = async () => {
			const userData = await getUserData(token);
			setUser(userData);
		};
		fetchUserData();
	}, [token]);

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	const onSubmits = async () => {
		if (!newPassword) {
			toast.error("Password is required.");
			return;
		}
		if (newPassword.length < 8) {
			toast.error("Password must be at least 8 characters long.");
			return;
		}
		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}

		try {
			const response = await axios.post(
				`http://127.0.0.1:8000/api/reset-password`,
				{
					email: user?.email,
					code,
					current_password: currentPassword,
					password: newPassword,
					password_confirmation: confirmPassword,
				},
			);
			if (response?.data?.success) {
				toast.success("Password reset successfully.");
			}
			newPasswordModal.onClose();
			loginModal.onOpen();
		} catch (error) {
			toast.error(
				axios.isAxiosError(error) && error.response?.data?.error
					? error.response.data.error
					: "An unexpected error occurred.",
			);
		}
	};

	return (
		<motion.div
			initial={{ y: "115%" }}
			animate={{ y: "0%" }}
			transition={{ duration: 1, ease: "easeInOut" }}
			className="w-[60%] bg-[#04031b] rounded-xl py-5 h-[80vh] relative">
			<div className="absolute top-4 right-4">
				<button
					className="w-fit bg-[#2f1d88] text-white py-2 px-4 text-lg rounded-lg"
					onClick={onClose}>
					<X />
				</button>
			</div>
			<div className="w-full h-full flex justify-between items-center">
				<div className="w-1/2 h-full pointer-events-none pl-5">
					<Image
						src={formimg}
						alt="fromImage"
						className="w-full h-full object-cover rounded-lg"
					/>
				</div>
				<div className="w-1/2 flex items-center justify-center">
					<div className="w-full px-10 flex justify-center flex-col gap-8">
						<div className="flex flex-col gap-4">
							<h1 className="subHeading text-white font-bold leading-tight tracking-tight montserrat">
								Reset Password
							</h1>
							<div className="flex items-center gap-2">
								<p className="text-sm text-[#ADABB8] font-normal leading-tight tracking-tight montserrat">
									Enter you&apos;r new password.
								</p>
							</div>
						</div>
						<form
							onSubmit={handleSubmit(onSubmits)}
							className="flex flex-col gap-5">
							<div
								className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#2f1d88] focus-within:border-[1px] focus-within:ring-1`}>
								<Lock className="text-[#6D6980] mr-3" />
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Enter current password"
									value={currentPassword}
									required
									onChange={(e) => setCurrentPassword(e.target.value)}
									className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full font-Monstrate`}
								/>
								<div
									className="cursor-pointer"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? (
										<EyeOff className="text-[#6D6980]" />
									) : (
										<Eye className="text-[#6D6980]" />
									)}
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<div
									className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#2f1d88] focus-within:border-[1px] focus-within:ring-1`}>
									<Lock className="text-[#6D6980] mr-3" />
									<input
										type={showPassword ? "text" : "password"}
										placeholder="Enter new password"
										value={newPassword}
										required
										onChange={(e) => setNewPassword(e.target.value)}
										className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full font-Monstrate`}
									/>
									<div
										className="cursor-pointer"
										onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? (
											<EyeOff className="text-[#6D6980]" />
										) : (
											<Eye className="text-[#6D6980]" />
										)}
									</div>
								</div>
								<div
									className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#2f1d88] focus-within:border-[1px] focus-within:ring-1`}>
									<Lock className="text-[#6D6980] mr-3" />
									<input
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Confirm new password"
										value={confirmPassword}
										required
										onChange={(e) => setConfirmPassword(e.target.value)}
										className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full font-Monstrate`}
									/>
									<div
										className="cursor-pointer"
										onClick={() =>
											setShowConfirmPassword(!showConfirmPassword)
										}>
										{showConfirmPassword ? (
											<EyeOff className="text-[#6D6980]" />
										) : (
											<Eye className="text-[#6D6980]" />
										)}
									</div>
								</div>
							</div>
							<button
								type="submit"
								className="w-full bg-[#2f1d88] rounded-lg p-4 text-[16px] text-white font-normal text-center leading-tight tracking-tight cursor-pointer montserrat"
								disabled={isSubmitting}>
								{isSubmitting ? (
									<Loader2 className="animate-spin mx-auto" />
								) : (
									"Reset Password"
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
