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
        className="w-full p-2 border-2 border-slate-800 rounded-md mb-2"
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && <span className="error-message">{error.message}</span>}
    </>
  );
};
export default FormField;
