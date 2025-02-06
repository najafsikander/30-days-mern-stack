import SectionCard from "../../../components/SectionCard";
import LoginForm from "./Components/LoginForm";

const LoginPage:React.FC = () => {
    return (<>
        <section className="mx-3">
        <SectionCard header="Login">
            <LoginForm/>
        </SectionCard>
        </section>
    </>);
}
export default LoginPage;