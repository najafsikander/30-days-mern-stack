import { zodResolver } from "@hookform/resolvers/zod";
import SectionCard from "../../../components/SectionCard";
import { changePassSchema, FormData } from "../../../utils/types";
import { useForm } from "react-hook-form";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";
import { changeUserPassword } from "../../../services-url/users";
import { useUser } from "../../../hooks/useUser";

const ChangePassPage = () => {

    const {user,setUser} = useUser();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
        resolver: zodResolver(changePassSchema)
    });

    const changePassword = async (data:FormData):Promise<void> => {
        try {
            const response = await fetch(changeUserPassword(user!.id), {
                method:'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer '+user!.token
                },
                body: JSON.stringify(data)
            });

            console.log('Response: ' + response);
            const result = await response.json()
            console.log('Result:' + result);
            if(!response.ok) throw result.error;
            const userObj = {
                id: result.user._id,
                token: result.user.token
            };
            setUser(userObj);
            localStorage.removeItem('token');
            localStorage.setItem('token', result.user.token);
            alert('Password reset successfully');
            reset();
        } catch (err) {
            console.warn('Error caught while resetting password: ', err);
            alert('Error Occured');
        }
    }

    const goBackToPreviousPage = () => {
        navigate(-1);
    }

    return (<>
        <SectionCard header="Change Password">
            <div className="flex w-full justify-center">
                <div className="flex flex-col">
                    <form onSubmit={handleSubmit(changePassword)}>
                        <FormField
                        name="oldPassword"
                        type="password"
                        placeholder="Old Password"
                        register={register}
                        error={errors.oldPassword}/>

                        <FormField
                        name="password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        error={errors.password}/>

                        <FormField
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        register={register}
                        error={errors.confirmPassword}/>

                        <div className="flex flex-row justify-center gap-2">
                            <Button type="button" label="Cancel" onClick={goBackToPreviousPage}/>
                            <Button type="submit" label="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </SectionCard>
    </>);
}

export default ChangePassPage;