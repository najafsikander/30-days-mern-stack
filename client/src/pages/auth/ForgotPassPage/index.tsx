import { useForm } from "react-hook-form";
import SectionCard from "../../../components/SectionCard";
import { ForgotPasswordSchema, MainFormData } from "../../../utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";
import { resetUserPassword } from "../../../services-url/users";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const {
        register,
        formState: {errors},
        reset,
        handleSubmit
    } = useForm<MainFormData>({
        resolver: zodResolver(ForgotPasswordSchema)
    });

    const resetPassword = async (data: MainFormData): Promise<void> => {
        try {
            console.log("Successfully reset password: ", data);
            const response = await fetch(resetUserPassword, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log('Response: ', response);
            const result = await response.json();
            console.log('result: ', result);
            if(!response.ok) throw result.error;
            reset();
            alert('Password reset successfully');
        } catch (err) {
            console.warn('Error caught while resetting password: ', err);
            alert(err);
        }
    }
    return(
        <>
            <SectionCard header="Forgot Password">
                <form onSubmit={handleSubmit(resetPassword)}>
                    <FormField
                        name="email"
                        placeholder="Email"
                        register={register}
                        error={errors.email}
                        type="email"
                    />
                    <div className="flex flex-row gap-2">
                    <Button type="button" label="Cancel" onClick={() => navigate(-1)}/>
                    <Button type="submit" label="Submit"/>
                    </div>
                </form>
            </SectionCard>
        </>
    )
}

export default ForgotPasswordPage;