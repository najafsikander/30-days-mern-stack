
import SectionCard from "../../components/SectionCard";
import { useUser } from "../../hooks/useUser";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

const ProfilePage:React.FC = () => {
    const {user,logout} = useUser();
    const navigate = useNavigate();
    console.log('user in profile page: ', user);

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    }

    return (
        <>
            <SectionCard header="Profile"> 
                Profile children 
                {user&&
                <h1>{user.id}</h1>}
                <Button label="Logout" onClick={handleLogout}/>
            </SectionCard>
        </>
    )
}

export default ProfilePage;