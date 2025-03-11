import { zodResolver } from "@hookform/resolvers/zod";
import SectionCard from "../../../components/SectionCard";
import { ChangePassSchema, MainFormData, NewPassSchema } from "../../../utils/types";
import { useForm } from "react-hook-form";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";
import { changeUserPassword, newUserPassword } from "../../../services-url/users";
import { useUser } from "../../../hooks/useUser";

type Props ={
    forgotPass?: boolean;
    token?: string;
};
const ChangePassPage:React.FC<Props> = ({forgotPass=false,token}) => {

    const {user,setUser} = useUser();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}, reset} = useForm<MainFormData>({
        resolver: zodResolver(!forgotPass? ChangePassSchema:NewPassSchema)
    });

    //Change User Password
    const changePassword = async (data:MainFormData):Promise<void> => {
        try {
            const request = data;
            if(!forgotPass) request.token = token;
            const url = changeUserPassword(user!.id);
            const response = await fetch(url, {
                method:'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer '+user!.token
                },
                body: JSON.stringify(request)
            });

            console.log('Response: ' + response);
            const result = await response.json()
            console.log('Result:' + result);
            if(!response.ok) throw result.error;
            const userObj = {
                id: result.user._id,
                token: result.user.token,
                details: result.user
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

    //Recover User Account Via Forgot Password
    const recoverAccount = async (data:MainFormData):Promise<void> => {
        try {
            const request = data;
            request.token = token;
            const url = newUserPassword;
            const response = await fetch(url, {
                method:'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            console.log('Response: ' + response);
            const result = await response.json()
            console.log('Result:' + result);
            if(!response.ok) throw result.error;
            alert('Password reset successfully');
            reset();
            navigate('/auth/login');
        } catch (err) {
            console.warn('Error caught while resetting password: ', err);
            alert('Error Occured: ' + err);
        }
    }

    const goBackToPreviousPage = () => {
        navigate(-1);
    }

    return (<>
        <SectionCard header={!forgotPass?"Change Password":''}>
            <div className="flex w-full justify-center">
                <div className="flex flex-col">
                    <form onSubmit={handleSubmit(!forgotPass?changePassword: recoverAccount)}>
                        {
                            !forgotPass &&
                            <FormField
                            name="oldPassword"
                            type="password"
                            placeholder="Old Password"
                            register={register}
                            error={errors.oldPassword}/>
                        }

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
                            {
                                !forgotPass &&
                                <Button type="button" label="Cancel" onClick={goBackToPreviousPage}/>
                            }
                            <Button type="submit" label="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </SectionCard>
    </>);
}

export default ChangePassPage;