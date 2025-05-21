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
import { Code, Loader2, X } from "lucide-react";
import useLoginModal from "@/hooks/use-login-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import useEmailVerifyModal from "@/hooks/use-emailverify-modal";
import { emailVerificationSchema, TemailVerifyFormData } from "@/schemas";

export default function EmailVerify({ onClose }: { onClose: () => void }) {
	const token = getToken();
	const loginModal = useLoginModal();
	const emailVerifyModal = useEmailVerifyModal();
	const [user, setUser] = useState<TuserProps>();

	useEffect(() => {
		const fetchUserData = async () => {
			const userData = await getUserData(token);
			setUser(userData);
		};
		fetchUserData();
	}, [token]);

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<TemailVerifyFormData>({
		resolver: zodResolver(emailVerificationSchema),
	});

	const onSubmits = async (data: TemailVerifyFormData) => {
		await axios
			.post(`http://127.0.0.1:8000/api/email/verify-code`, {
				...data,
				email: user?.email,
			})
			.then((response) => {
				if (response?.data?.success) {
					toast.success(response.data.success);
					emailVerifyModal.onClose();
					loginModal.onOpen();
				}
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response.data.error);
				}
				console.log(err);
			});
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
								Verify Email.
							</h1>
							<div className="flex items-center gap-2">
								<p className="text-sm text-[#ADABB8] font-normal leading-tight tracking-tight montserrat">
									Enter 6 digit code sent to your email.
								</p>
							</div>
						</div>
						<form
							onSubmit={handleSubmit(onSubmits)}
							className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-5">
									<div className="flex flex-col gap-2">
										<div
											className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#3920BA] focus-within:border-[1px] focus-within:ring-1 ${
												errors.code && "border-red-500 border-[1px]"
											}`}>
											<Code className="text-[#6D6980] mr-3" />
											<input
												type="number"
												{...register("code", { valueAsNumber: true })}
												placeholder="Code"
												className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full montserrat`}
											/>
										</div>
										{errors.code && (
											<span className="text-red-500 text-sm montserrat">
												{errors.code.message}
											</span>
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
									"Verify Code"
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
