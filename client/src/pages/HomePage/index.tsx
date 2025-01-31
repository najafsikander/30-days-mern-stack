import { useState } from "react";
import { useGetAllUsers } from "../../tanstack-queries/users";
import Button from "../../components/Button";
import Form from "./components/Form";
import SectionCard from "../../components/SectionCard";
const HomePage = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [limit] = useState<number>(2);
  const [skip] = useState<number>(1);
  const [sortBy] = useState<string>("-createdAt");
  const { status, data, error, isFetching, refetch } = useGetAllUsers(
    skip,
    limit,
    sortBy
  );

  const tableHeading: Array<string> = ["First Name", "Last Name", "Email"];

  console.info({ status, data, error, isFetching });

  const handleClick = (): void => {
    alert(`Input message is: ${inputMessage}`);
  };
  return (
    <>
      <div className="w-full text-center mt-3">
        <h1 className="text-white font-bold text-5xl">Vite + React</h1>
        {/* Table Area */}
        <SectionCard header="Data Grid">
          {status === "pending" && isFetching === true && <p>Loading</p>}
          {status === "error" && isFetching === false && <p>Error</p>}

          <div className="flex justify-center mt-3">
            <table className="w-full border-2 border-slate-800">
              {/* Table Heading */}
             <thead>
             <tr>
                {tableHeading.map((heading) => (
                  <th className="border-2 border-slate-800" key={heading}>{heading}</th>
                ))}
              </tr>
             </thead>
              {/* If rows are empty */}
              <tbody>
              {(data && data.length) === 0 && (
                <tr>
                  <td colSpan={3} className="border-2 border-slate-800">
                    Empty Records
                  </td>
                </tr>
              )}
              {/* If rows are not empty */}
              {data &&
                data.length > 0 &&
                data.map((user) => (
                  <tr key={user._id}>
                    <td className="border-2 border-slate-800">
                      {user.firstName}
                    </td>
                    <td className="border-2 border-slate-800">
                      {user.lastName}
                    </td>
                    <td className="border-2 border-slate-800">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />{" "}
        <Button label="Submit" onClick={handleClick} />
        <Form refetch={refetch} />
      </div>
    </>
  );
};

export default HomePage;
