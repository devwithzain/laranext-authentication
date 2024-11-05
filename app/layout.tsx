import "@/styles/globals.css";
import type { Metadata } from "next";
import ToastProvider from "@/providers/toast-provider";

export const metadata: Metadata = {
	title: "Authentication",
	description: "Authentication with laravel and nextjs",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ToastProvider />
				{children}
			</body>
		</html>
	);
}
