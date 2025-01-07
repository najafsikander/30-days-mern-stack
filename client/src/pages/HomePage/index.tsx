import { useState } from "react";
import { useGetAllUsers } from "../../tanstack-queries/users";
import Button from "../../components/Button";
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
