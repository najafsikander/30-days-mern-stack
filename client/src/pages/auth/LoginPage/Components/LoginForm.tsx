
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate,Link } from "react-router";

import { MainFormData, LoginSchema } from "../../../../utils/types";
import FormField from "../../../../components/FormField";
import Button from "../../../../components/Button";
import { useUser } from "../../../../hooks/useUser";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const {setUser} = useUser()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MainFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data:MainFormData) => {
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
        localStorage.setItem('user',JSON.stringify(result.user));
        const userObj = {
          id: result.user._id,
          details: result.user,
          token: result.user.token
        };
        setUser(userObj);
        reset();
        navigate('/');
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
      <p>If you dont have an account, <Link className="underline text-indigo-800 font-bold" to={'/auth/signup'} title="Signup">Click Here</Link> to SignUp</p>
      <p>If you have forgotten password,<Link className="underline text-indigo-800 font-bold" to={'/auth/forgotPassword'} title="Forgot Password">Click Here</Link> to recover account</p>
    </>
  );
};
export default LoginForm;
