"use client";
import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";

export default function Home() {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	return (
		<div className="w-full h-screen flex items-center justify-center bg-[#f1f1f1]">
			<div className="flex items-center gap-4">
				<button
					className="text-lg leading-tight tracking-tight px-5 py-3 rounded-md bg-black text-white"
					onClick={() => loginModal.onOpen()}>
					LogIn
				</button>
				<button
					className="text-lg leading-tight tracking-tight px-5 py-3 rounded-md bg-black text-white"
					onClick={() => registerModal.onOpen()}>
					Sign Up
				</button>
			</div>
		</div>
	);
}
