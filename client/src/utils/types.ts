import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type MainFormData = {
    firstName?: string;
    lastName?: string;
    email?: string;
    oldPassword?: string;
    password?: string;
    confirmPassword?: string;
    token?: string;
}

export type RatingFormData = {
    remark: string;
    rating: number;
}


export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<MainFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    readonly?: boolean;
};

export type ValidFieldNames =
  "firstName"
  | "lastName"
  | "email"
  | "oldPassword"
  | "password"
  | "confirmPassword"
  | "token"

export const UserSchema: ZodType<MainFormData> = z.object({
    firstName: z.string().nonempty().min(3),
    lastName: z.string().nonempty().min(3),
    email: z.string().email(),
});

export const LoginSchema: ZodType<MainFormData> = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const SignupSchema: ZodType<MainFormData> = z.object({
    firstName: z.string().nonempty().min(3),
    lastName: z.string().nonempty().min(3),
    email: z.string().email(),
    password: z.string().min(6)
});

export const editProfileSchema: ZodType<MainFormData> = z.object({
    firstName: z.string().nonempty().min(3),
    lastName: z.string().nonempty().min(3),
    email: z.string().email(),
});

export const ChangePassSchema: ZodType<MainFormData> = z.object({
    oldPassword: z.string().min(6),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
}).refine(({password,confirmPassword}) => password === confirmPassword, {message:'Passwords do not match', path: ['confirmPassword']});

export const NewPassSchema: ZodType<MainFormData> = z.object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
}).refine(({password,confirmPassword}) => password === confirmPassword, {message:'Passwords do not match', path: ['confirmPassword']});

export const ForgotPasswordSchema: ZodType<MainFormData> = z.object({
    email: z.string().email()
});

export const RatinngSchema: ZodType<RatingFormData> = z.object({
    remark: z.string().nonempty(),
    rating: z.number().min(1).max(5)
});