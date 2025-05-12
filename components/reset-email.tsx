"use client";
import axios from "axios";
import Image from "next/image";
import { formimg } from "@/public";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { AtSign, Loader2, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailCodeSentSchema, TemailVerifyCodeFormData } from "@/schemas";
import useEmailCodeSentModal from "@/hooks/use-emailCodeSent-modal";
import useVerifyResetCodeModal from "@/hooks/use-verifyResetCode-modal";

export default function ResetEmail({ onClose }: { onClose: () => void }) {
	const emailCodeSentModal = useEmailCodeSentModal();
	const verifyResetCodeModal = useVerifyResetCodeModal();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<TemailVerifyCodeFormData>({
		resolver: zodResolver(emailCodeSentSchema),
	});

	const onSubmits = async (data: TemailVerifyCodeFormData) => {
		try {
			await axios.post(`http://127.0.0.1:8000/api/forgot-password`, data);
			toast.success("A 6-digit code has been sent to your email.");
			emailCodeSentModal.onClose();
			verifyResetCodeModal.onOpen();
		} catch (error) {
			toast.error(
				axios.isAxiosError(error) && error.response?.data?.error
					? error.response.data.error
					: "An unexpected error occurred.",
			);
			console.log(error);
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
								Forgot Password.
							</h1>
							<div className="flex items-center gap-2">
								<p className="text-sm text-[#ADABB8] font-normal leading-tight tracking-tight montserrat">
									Enter you&apos;r email to get a 6 digit reset code.
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
												errors.email && "border-red-500 border-[1px]"
											}`}>
											<AtSign className="text-[#6D6980] mr-3" />
											<input
												type="email"
												{...register("email")}
												placeholder="Email"
												className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full montserrat`}
											/>
										</div>
										{errors.email && (
											<span className="text-red-500 text-sm montserrat">
												{errors.email.message}
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
									"Send Code"
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
