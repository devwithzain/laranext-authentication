import "@/styles/globals.css";
import type { Metadata } from "next";
import { AuthModel } from "@/components";
import ToastProvider from "@/providers/toast-provider";

export const metadata: Metadata = {
	title: "Complete Authentication",
	description:
		"Complete Authentication Auth Kit by devwithzain using Next.js as frontend and laravel as backend",
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
				<AuthModel />
				{children}
			</body>
		</html>
	);
}
