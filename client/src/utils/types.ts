import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
    firstName?: string;
    lastName?: string;
    email: string;
    password?: string;
}


export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

export type ValidFieldNames =
  "firstName"
  | "lastName"
  | "email"
  | "password"

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
    password: z.string().min(6),
});