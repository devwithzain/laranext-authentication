"use client";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { TuserProps } from "@/types";
import { useForm } from "react-hook-form";
import { getToken } from "@/lib/get-token";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/lib/get-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema, TUserProfileProps } from "@/schemas";

export default function ProfileForm() {
	const token = getToken();
	const router = useRouter();
	const [admin, setAdmin] = useState<TuserProps>();
	const [image, setImage] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");
	const [imageError, setImageError] = useState<string>("");
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	const form = useForm<TUserProfileProps>({
		resolver: zodResolver(userProfileSchema),
		defaultValues: admin || {
			name: "",
			email: "",
			image: "",
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	useEffect(() => {
		const fetchUserData = async () => {
			const userData = await getUserData(token);
			form.reset({
				name: userData.name,
				email: userData.email,
				image: userData.image,
			});
			setAdmin(userData);
		};
		fetchUserData();
	}, [form, token]);

	useEffect(() => {
		if (admin?.image) {
			const imageUrl = admin.image.includes("http")
				? admin.image
				: `http://127.0.0.1:8000/storage/${admin.image}`;
			setImageUrl(imageUrl);
			setPreviewImage(imageUrl);
		}
	}, [admin]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageError("");
		const file = e.target.files?.[0];

		if (!file) return;

		const allowedTypes = [
			"image/jpeg",
			"image/png",
			"image/jpg",
			"image/gif",
			"image/svg+xml",
		];

		if (!file.type.startsWith("image/")) {
			setImageError("File must be an image");
			return;
		}

		if (!allowedTypes.includes(file.type)) {
			setImageError("Only jpeg, png, jpg, gif, svg images are allowed");
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			const base64 = reader.result as string;
			setPreviewImage(base64);
			setImage(base64);
		};
		reader.readAsDataURL(file);
	};

	const onSubmits = async (data: TUserProfileProps) => {
		try {
			const formData = new FormData();
			Object.keys(data).forEach((key) => {
				if (key !== "image") {
					formData.append(key, data[key as keyof TUserProfileProps]);
				}
			});

			if (image && image.startsWith("data:")) {
				const blob = dataURLtoBlob(image);
				formData.append("image", blob, "profile-image.png");
			}

			await axios.post(
				`http://127.0.0.1:8000/api/profile/update/${admin?.id}`,
				formData,
				{
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
						"Content-Type": "multipart/form-data",
					},
				},
			);
			toast.success("Profile updated successfully");
			router.refresh();
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				console.error(error.response);
				if (error.response.data.messages.email) {
					toast.error(error.response.data.messages.email[0]);
				} else {
					toast.error(error.response.data.messages.error);
				}
			} else {
				console.error(error);
				toast.error("An unexpected error occurred");
			}
		}
	};

	const dataURLtoBlob = (dataURL: string): Blob => {
		const byteString = atob(dataURL.split(",")[1]);
		const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ab], { type: mimeString });
	};

	return (
		<div className="w-full padding-y">
			<div className="flex items-center justify-between px-5 py-2">
				<div className="flex flex-col gap-3">
					<h2 className="text-black subHeading font-semibold leading-tight tracking-tight">
						Settings
					</h2>
					<p className="text-black paragraph font-normal leading-tight tracking-tight">
						Edit your details!
					</p>
				</div>
			</div>
			<hr />
			<form
				onSubmit={form.handleSubmit(onSubmits)}
				className="space-y-4 w-full p-5">
				<div className="flex flex-col gap-2">
					<label className="text-black paragraph font-normal leading-tight tracking-tight">
						Name
					</label>
					<input
						{...form.register("name")}
						placeholder="Name"
						className="w-full p-2 border rounded text-black paragraph font-normal leading-tight tracking-tight"
					/>
					{form.formState.errors.name && (
						<p className="text-red-500">
							{form.formState.errors.name.message?.toString()}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-black paragraph font-normal leading-tight tracking-tight">
						Email
					</label>
					<input
						{...form.register("email")}
						placeholder="Email"
						type="email"
						className="w-full p-2 border rounded text-black paragraph font-normal leading-tight tracking-tight"
					/>
					{form.formState.errors.email && (
						<p className="text-red-500">
							{form.formState.errors.email.message?.toString()}
						</p>
					)}
				</div>
				<div className="w-full flex flex-col gap-2">
					<label className="text-black paragraph font-normal leading-tight tracking-tight">
						Profile Image
					</label>
					<input
						type="file"
						accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
						onChange={(e) => {
							handleFileChange(e);
							form.setValue("image", e.target.files);
						}}
						className="w-full p-2 border rounded text-black paragraph font-normal leading-tight tracking-tight"
					/>
					{imageError && <p className="text-red-500 text-sm">{imageError}</p>}
					{form.formState.errors.image && (
						<p className="text-red-500">
							{form.formState.errors.image.message?.toString()}
						</p>
					)}
				</div>
				<div className="flex items-center gap-2">
					{(previewImage || imageUrl) && (
						<Image
							src={previewImage || imageUrl}
							alt="Profile"
							className="w-40 h-40 object-cover"
							width={160}
							height={160}
						/>
					)}
				</div>
				<button
					disabled={isSubmitting}
					type="submit"
					className="px-4 py-2 bg-black text-white rounded disabled:opacity-50">
					Save changes
				</button>
			</form>
		</div>
	);
}
