"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { placeholder } from "@/public";

export default function ImageUpload() {
	const [images, setImages] = useState<File[]>([]);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImages(Array.from(e.target.files));
		}

		const file = e.target.files?.[0];
		if (file) {
			const previewUrl = URL.createObjectURL(file);
			setImagePreview(previewUrl);
		}
	};

	const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const formData = new FormData();

		for (let i = 0; i < images.length; i++) {
			formData.append("images[]", images[i]);
		}

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_LARAVELA_URL}/upload-images`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			alert("Images uploaded successfully!");
			console.log(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<form onSubmit={() => handleSubmit}>
				<div className="flex flex-col items-center">
					<label
						htmlFor="fileInput"
						className="cursor-pointer">
						<div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
							<Image
								src={imagePreview || placeholder}
								alt="Avatar"
								className="w-full h-full object-cover"
								width={80}
								height={80}
							/>
						</div>
					</label>
					<input
						id="fileInput"
						type="file"
						onChange={handleImageChange}
						accept="image/*"
						className="hidden"
					/>
				</div>
			</form>
		</div>
	);
}
