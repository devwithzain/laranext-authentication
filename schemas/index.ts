import * as z from "zod";

export const loginFormSchema = z.object({
   email: z.string().email({
      message: "Email is required",
   }),
   password: z.string().min(1, {
      message: "Password is required",
   }),
});

export const registerFormSchema = z.object({
   name: z.string().min(1, {
      message: "Name is required",
   }),
   email: z.string().email({
      message: "Email is required",
   }),
   password: z.string().min(8, {
      message: "Minimum 8 characters required",
   }),
   confirmPassword: z.string().min(8, {
      message: "Minimum 8 characters required",
   }),
}).refine((data) => data.password === data.confirmPassword, {
   message: "Passwords don't match",
   path: ["confirmPassword"],
});

export const emailVerificationSchema = z.object({
   code: z.number().min(1, {
      message: "Code is required",
   }),
});

export const emailCodeSentSchema = z.object({
   email: z.string().email({
      message: "Email is required",
   }),
});

export const userProfileSchema = z.object({
   name: z.string(),
   email: z.string(),
   image: z.any().nullable(),
});

export type TloginFormData = z.infer<typeof loginFormSchema>;
export type TUserProfileProps = z.infer<typeof userProfileSchema>;
export type TregisterFormData = z.infer<typeof registerFormSchema>;
export type TemailVerifyCodeFormData = z.infer<typeof emailCodeSentSchema>;
export type TemailVerifyFormData = z.infer<typeof emailVerificationSchema>;