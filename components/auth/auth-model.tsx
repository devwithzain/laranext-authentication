"use client";
import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";
import useEmailVerifyModal from "@/hooks/use-emailverify-modal";
import useNewPasswordModal from "@/hooks/use-newPassword-modal";
import useEmailCodeSentModal from "@/hooks/use-emailCodeSent-modal";
import useVerifyResetCodeModal from "@/hooks/use-verifyResetCode-modal";
import {
	EmailVerify,
	LoginForm,
	Modal,
	NewPassword,
	RegisterForm,
	ResetEmail,
	VerifyResetCode,
} from "@/components";

export default function AuthModel() {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const emailVerifyModal = useEmailVerifyModal();
	const newPasswordModal = useNewPasswordModal();
	const emailCodeSentModal = useEmailCodeSentModal();
	const verifyResetCodeModal = useVerifyResetCodeModal();

	return (
		<>
			<Modal
				isOpen={loginModal.isOpen}
				onClose={loginModal.onClose}
				body={<LoginForm onClose={loginModal.onClose} />}
			/>
			<Modal
				isOpen={registerModal.isOpen}
				onClose={registerModal.onClose}
				body={<RegisterForm onClose={registerModal.onClose} />}
			/>
			<Modal
				isOpen={emailVerifyModal.isOpen}
				onClose={emailVerifyModal.onClose}
				body={<EmailVerify onClose={emailVerifyModal.onClose} />}
			/>
			<Modal
				isOpen={emailCodeSentModal.isOpen}
				onClose={emailCodeSentModal.onClose}
				body={<ResetEmail onClose={emailCodeSentModal.onClose} />}
			/>
			<Modal
				isOpen={verifyResetCodeModal.isOpen}
				onClose={verifyResetCodeModal.onClose}
				body={<VerifyResetCode onClose={verifyResetCodeModal.onClose} />}
			/>
			<Modal
				isOpen={newPasswordModal.isOpen}
				onClose={newPasswordModal.onClose}
				body={<NewPassword onClose={newPasswordModal.onClose} />}
			/>
		</>
	);
}
