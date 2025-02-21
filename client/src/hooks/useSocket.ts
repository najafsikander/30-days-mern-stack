import { useContext } from "react"
import { SocketContext } from "../context/socketContext"
export const useSocket = () => {
    const context = useContext(SocketContext);
    if(!context) throw 'SocketContext is not provided';
    return context;
}