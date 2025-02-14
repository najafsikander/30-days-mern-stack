import { useEffect, useState } from "react";
import SectionCard from "../../../../components/SectionCard";
import { useSearchParams } from "react-router";
import ChangePassPage from "../../../ProfilePage/ChangePassPage";

const NewPassPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [token,setToken] = useState<string|null>(null);

    useEffect(() => {
        console.info('Params: ',searchParams.toString())
        if(searchParams.get('token')) {
            setToken(searchParams.get('token'));
        }

    },[searchParams]);
  return (
    <>
      <SectionCard header="New Password">
        {
            token != null &&
            <ChangePassPage forgotPass={true} token={token}/>
        }
      </SectionCard>
    </>
  );
};
export default NewPassPage;
