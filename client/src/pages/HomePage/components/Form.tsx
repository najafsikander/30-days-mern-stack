import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "../../../utils/types";
import FormField from "../../../components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  refetch: () => void;
}
const Form:React.FC<Props> = ({refetch}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema)
  });

  const onSubmit = async (data: FormData) => {
    console.log("SUCCESS", data);
    await fetch('http://localhost:8080/v1/users/user', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'user':data
      })
    })
    refetch();
}
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Form</h1>
          <FormField
            type="text"
            placeholder="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
          />
          <br/>
          <FormField
            type="text"
            placeholder="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
          />
          <br/>
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
