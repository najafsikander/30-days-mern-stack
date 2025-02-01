import { useState } from "react";
import { useGetAllUsers } from "../../tanstack-queries/users";
import Form from "./components/Form";
import SectionCard from "../../components/SectionCard";
const HomePage = () => {
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
                    <th className="border-2 border-slate-800" key={heading}>
                      {heading}
                    </th>
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
                      <td className="border-2 border-slate-800">
                        {user.email}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Form Area */}
        <SectionCard header="Form Area">
          <Form refetch={refetch} />
        </SectionCard>
      </div>
    </>
  );
};

export default HomePage;
