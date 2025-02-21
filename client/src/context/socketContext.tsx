import { createContext, FC, ReactNode, useEffect, useState, useRef } from "react";
import { Socket, io } from "socket.io-client";

const SERVER_URL = 'http://localhost:8080';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
    disconnectSocket: () => void;
}

const SocketContext = createContext<SocketContextType|undefined>(undefined);

const SocketProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const token = localStorage.getItem('token');
    const socketRef = useRef<Socket|null>(null);

    useEffect(() => {
        if (!socketRef.current) {
            console.log("Initializing socket connection...");

            socketRef.current = io(SERVER_URL, { 
                auth: { token },
            });
            

            socketRef.current.on("connect", () => {
                setIsConnected(true);
                console.log("Connected to socket:", socketRef.current?.id);
            });

            socketRef.current.on("disconnect", () => {
                setIsConnected(false);
                console.log("Disconnected from socket");
            });
        }

        return () => {
           
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const disconnectSocket = () => {
        if (socketRef.current) {
            console.log("Cleaning up socket...");
            socketRef.current.disconnect();
            socketRef.current = null;
            setIsConnected(false);
        }
    }

    return (
        <SocketContext.Provider value={{socket: socketRef.current, isConnected,disconnectSocket}}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketProvider };