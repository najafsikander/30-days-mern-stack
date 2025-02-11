import { FormFieldProps } from "../utils/types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  readonly
}) => {
  return (
    <>
      <div>
      <input
        className="w-full p-2 border-2 border-slate-800 rounded-md mb-2"
        type={type}
        placeholder={placeholder}
        readOnly={readonly}
        {...register(name, type === "number" ? { valueAsNumber: true } : {})}
      />
      {error && <span className="error-message">{error.message}</span>}
      </div>
    </>
  );
};

export default FormField;
