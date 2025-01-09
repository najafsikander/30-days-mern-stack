import { Link } from "react-router";
const Header:React.FC = () => {
    return (
        <header className="bg-white text-gray-800 ">
            <nav className="w-full flex justify-between items-center p-4">
                <a href="/" className="text-2xl font-bold">Logo</a>
                <ul className="flex space-x-4">
                    <li><Link to={'/'}>Home Page</Link></li>
                    <li><Link to={'/auth/login'}>Login Page</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;