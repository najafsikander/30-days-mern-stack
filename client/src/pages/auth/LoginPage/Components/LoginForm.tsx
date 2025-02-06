import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormData, LoginSchema } from "../../../../utils/types";
import FormField from "../../../../components/FormField";
import Button from "../../../../components/Button";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data:LoginFormData) => {
    try {
        console.log("SUCCESS", data);
        const request = data;
        const response = await fetch('http://localhost:8080/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        const result = await response.json();

        if(!response.ok) throw result.error;

        console.log('Login successful: ', result);
        localStorage.setItem('token',result.user.token);
        localStorage.setItem('userId',result.user._id);
        reset();
    } catch (err) {
        console.warn('Error when logging in: ', err);
        alert(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          type="text"
          name="email"
          placeholder="Email"
          register={register}
          error={errors.email}
        />
        <FormField
          type="text"
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password}
        />
        <br/>
        <Button type="submit" label="Login"></Button>
      </form>
    </>
  );
};
export default LoginForm;
