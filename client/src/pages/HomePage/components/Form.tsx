import { useForm } from "react-hook-form";
import { MainFormData, UserSchema } from "../../../utils/types";
import FormField from "../../../components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/Button";
type Props = {
  refetch: () => void;
};
const Form: React.FC<Props> = ({ refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MainFormData>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: MainFormData) => {
    try {
      console.log("SUCCESS", data);
      const result = await fetch("http://localhost:3000/v1/users/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: data,
        }),
      });
      const jsonReponse = await result.json();
      if (!result.ok) throw jsonReponse.error;
      reset();
      refetch();
    } catch (error) {
      console.error("Error in handle submit: ", error);
      alert(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormField
            type="text"
            placeholder="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
          />
          <br />
          <FormField
            type="text"
            placeholder="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
          />
          <br />
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />
          <Button label="Submit" type="submit"/>
        </div>
      </form>
    </>
  );
};

export default Form;
