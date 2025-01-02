import { useEffect,useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Message from './components/Message'
import './App.css'

function App() {
  const [message,setMessage] = useState<string>('');

  useEffect(() => {
    console.log('App mounted')
    fetchData();
  }, [])

  const fetchData = async ():Promise<void> => {
   const response:Response = await fetch('http://localhost:8080/test');
   const json = await response.json();
   console.log(json.message);
   if(json.message) setMessage(json.message.toString());
  }

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

      {
        message &&
       <Message message={message}/>
      }
    </>
  )
}

export default App
