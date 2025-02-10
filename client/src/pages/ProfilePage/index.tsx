
import SectionCard from "../../components/SectionCard";
import { useUser } from "../../hooks/useUser";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { useSingleUser } from "../../tanstack-queries/users";

const ProfilePage:React.FC = () => {
    const {user,logout} = useUser();
    const navigate = useNavigate();
    const { status, data, error, isFetching } = useSingleUser(user? user.id : '');

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    }

    console.log({status, data, error, isFetching})

    //Validation renders
    if(!user) return (<h1 className="text-white">User is not logged in</h1>)
    if(isFetching && status === 'pending') return (<h1 className="text-white">Loading profile</h1>)
    if(error) return (<h1 className="text-white">Error occured while fetching profile details</h1>)
    if(!data) return (<h1 className="text-white">No data</h1>)

    return (
        <>
            <SectionCard header="Profile"> 
                <div className="w-full flex flex-row justify-center">
                    
                    <div className="flex flex-col">
                    <div className="w-full flex justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="profile picture"
                    className="w-28 border-2 border-slate-800 rounded-[80px] m-2 shadow-lg"/>
                    </div>
                    <input type="text" readOnly value={data.firstName}  className="border-2 border-slate-800 rounded-md px-2 text-lg my-1"/>
                    <input type="text" readOnly value={data.lastName}  className="border-2 border-slate-800 rounded-md px-2 text-lg my-1"/>
                    <input type="email" readOnly value={data.email}  className="border-2 border-slate-800 rounded-md px-2 text-lg my-1"/>
                    <input type="text" readOnly value={data.createdAt}  className="border-2 border-slate-800 rounded-md px-2 text-lg my-1"/>
                    {user && <Button label="Logout" onClick={handleLogout}/>}
                    </div>
                </div>
                
            </SectionCard>
        </>
    )
}

export default ProfilePage;