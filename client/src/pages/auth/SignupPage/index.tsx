import SectionCard from "../../../components/SectionCard";
import SignupForm from "./Components/SingupForm";

const SignupPage:React.FC = () => {
    return (
        <>
            <section className="mx-3">
                <SectionCard header="Signup">
                    <SignupForm/>
                </SectionCard>
            </section>
        </>
    );
}

export default SignupPage;