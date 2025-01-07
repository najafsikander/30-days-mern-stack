import { FormFieldProps } from "../utils/types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && <span className="error-message">{error.message}</span>}
    </>
  );
};
export default FormField;
