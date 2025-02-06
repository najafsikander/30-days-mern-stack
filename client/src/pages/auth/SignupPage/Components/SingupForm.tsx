import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate,Link } from "react-router";
import { SignupSchema, FormData } from "../../../../utils/types";
import FormField from "../../../../components/FormField";
import Button from "../../../../components/Button";

const SignupForm: React.FC = () => {
    const navigator = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit = async (data: FormData) => {
    console.info("SUCCESS", data);
    try {
        const request = {
            user: data
        }
        const response = await fetch('http://localhost:8080/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        })

        const result = await response.json();
        if (!response.ok) throw result.error;
        console.log('Signup successful: ', result);
        reset();
        navigator('/auth/login');
    } catch(err) {
        console.warn('Error when signing up: ', err);
        alert(err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="firstName"
          placeholder="First Name"
          type="text"
          register={register}
          error={errors.firstName}
        />

        <FormField
          name="lastName"
          placeholder="Last Name"
          type="text"
          register={register}
          error={errors.lastName}
        />
        <FormField
          name="email"
          placeholder="email"
          type="email"
          register={register}
          error={errors.email}
        />
        <FormField
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          error={errors.password}
        />
        <br/>
        <Button label="Submit" type="submit" />
      </form>
      <p>If you already have an account, <Link className="underline text-indigo-800 font-bold" to={'/auth/login'} title="Login">Click Here</Link> to Login</p>
    </>
  );
};

export default SignupForm;
