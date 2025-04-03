import { Link } from "react-router";
import { useUser } from "../hooks/useUser";

const Header:React.FC = () => {
    const {user} = useUser()
    return (
        <header className="bg-white text-gray-800 ">
            <nav className="w-full flex justify-between items-center p-4">
                <a href="/" className="text-2xl font-bold">Logo</a>
                <ul className="flex space-x-4">
                    <li><Link to={'/'}>Home</Link></li>
                    {!user &&
                    <li><Link to={'/auth/login'}>Login</Link></li>
                    }
                    {user &&
                    <>
                    <li><Link to={'/chat/private'}>Chat</Link></li>
                    <li><Link to={'/profile'}>Profile</Link></li>
                    <li><Link to={'/ratings'}>Ratings</Link></li>
                    </>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;