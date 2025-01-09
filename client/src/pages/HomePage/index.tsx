import { useState } from "react";
import { useGetAllUsers } from "../../tanstack-queries/users";
import Button from "../../components/Button";
import Form from "./components/Form";
const HomePage = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const { status, data, error, isFetching, refetch } = useGetAllUsers();

  console.info({ status, data, error, isFetching });

  const handleClick = (): void => {
    alert(`Input message is: ${inputMessage}`);
  };
  return (
    <>
      <h1>Vite + React</h1>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />{" "}
      <Button label="Submit" onClick={handleClick} />
      {status === "pending" && isFetching === true && <p>Loading</p>}
      {status === "error" && isFetching === false && <p>Error</p>}
      <ul>
        {data?.map((data) => (
          <li key={data?._id}>
            {data.firstName} {data.lastName}
          </li>
        ))}
      </ul>

      <Form refetch={refetch}/>
    </>
  );
};

export default HomePage;
