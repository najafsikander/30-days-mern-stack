import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
    firstName?: string;
    lastName?: string;
    email?: string;
    oldPassword?: string;
    password?: string;
    confirmPassword?: string;
}


export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
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

export const UserSchema: ZodType<FormData> = z.object({
    firstName: z.string().nonempty().min(3),
    lastName: z.string().nonempty().min(3),
    email: z.string().email(),
});

export const LoginSchema: ZodType<FormData> = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const SignupSchema: ZodType<FormData> = z.object({
    firstName: z.string().nonempty().min(3),
    lastName: z.string().nonempty().min(3),
    email: z.string().email(),
    password: z.string().min(6)
});

export const editProfileSchema: ZodType<FormData> = z.object({
    firstName: z.string().nonempty().min(3),
    lastName: z.string().nonempty().min(3),
    email: z.string().email(),
});

export const changePassSchema: ZodType<FormData> = z.object({
    oldPassword: z.string().min(6),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
}).refine(({password,confirmPassword}) => password === confirmPassword, {message:'Passwords do not match', path: ['confirmPassword']});