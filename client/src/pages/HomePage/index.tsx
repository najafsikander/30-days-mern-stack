import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useGetAllUsers } from "../../tanstack-queries/users";
import Form from "./components/Form";
import SectionCard from "../../components/SectionCard";
const HomePage = () => {
  const [limit] = useState<number>(2);
  const [skip,setSkip] = useState<number>(1); //current page
  const [sortBy, setSortBy] = useState<string>("-createdAt");
  const { status, data, error, isFetching, refetch } = useGetAllUsers(
    skip,
    limit,
    sortBy
  );

  const tableHeading: Array<string> = ["First Name", "Last Name", "Email"];
  const totalPages = useRef<number>(1);

  console.info({ status, data, error, isFetching });
  const toggleSort = (): void => {
    if (sortBy == "-createdAt") return setSortBy("createdAt");
    if (sortBy == "createdAt") return setSortBy("-createdAt");
  };

  useEffect(() => {
    totalPages.current = Math.round(Number(data?.total) / limit);
    console.info(totalPages.current);
  }, [data?.total, limit]);


  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy,skip]);

  const changePage = (action:string):void => {
    if(action === 'next') {
      console.info('Next Page');
      if(skip < totalPages.current) return setSkip((value:number) => ++value);
    }

    if(action === 'prev') {
      console.info('Previous Page');
      if(skip > 1) return setSkip((value:number) => --value);
    }
  }

  return (
    <>
      <div className="w-full text-center mt-3">
        <h1 className="text-white font-bold text-5xl">Vite + React</h1>
        {/* Table Area */}
        <SectionCard header="Data Grid">
          {status === "pending" && isFetching === true && <p>Loading</p>}
          {status === "error" && isFetching === false && <p>Error: {error.message}</p>}

          {/* Sorting action */}
          <div className="flex justify-end">
            <span
              className="text-slate-800 font-bold underline cursor-pointer"
              onClick={toggleSort}
              title="Current Order"
            >
              {sortBy === "-createdAt" ? "Latest Entries" : "Oldest Entries"}
            </span>
          </div>
          {/* Table */}
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
                {(data && data.users?.length) === 0 && (
                  <tr>
                    <td colSpan={3} className="border-2 border-slate-800">
                      Empty Records
                    </td>
                  </tr>
                )}
                {/* If rows are not empty */}
                {data &&
                  data.users?.length > 0 &&
                  data.users.map((user) => (
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
          {/* Pagination Area */}
          <div className="flex justify-end mt-3">
            {/* Left Arrow */}
            <button disabled={skip === 1} type="button" className="cursor-pointer" onClick={() => changePage('prev')}>
              <ChevronLeftIcon className={`size-7 ${skip === 1? 'text-gray-500': 'text-slate-800'}`}/>
            </button>
            {/* Right Arrow */}
            <button disabled={skip === totalPages.current} type="button" className="cursor-pointer" onClick={() => changePage('next')}>
              <ChevronRightIcon className={`size-7 ${skip === totalPages.current? 'text-gray-500': 'text-slate-800'}`}/>
            </button>
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
