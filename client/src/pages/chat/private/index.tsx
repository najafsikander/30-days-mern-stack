import { useEffect, useRef, useState } from "react";
import SectionCard from "../../../components/SectionCard";
import { useUser } from "../../../hooks/useUser";
import { useSocket } from "../../../hooks/useSocket";

const PrivateChatPage: React.FC = () => {
  const { user } = useUser();

  const { socket, isConnected,disconnectSocket } = useSocket();
  const [chatInput, setChatInput] = useState<string>("");
  const hasJoinedRoom = useRef(false);

  //UseEffect to get connection and establish socket events
  useEffect(() => {

    //If socket is connected
    if (socket && isConnected && !hasJoinedRoom.current) {
      console.log("Socket instance:", socket.id);
      hasJoinedRoom.current = true;

      // Join room
      socket.emit("join-private-chat", {
        roomName: "private-chat-1",
        userId: user?.id,
      });

      // Event handlers -> Join/Leave Room
      const handleJoin = (data: { userId: string }) => {
        console.log("Join event received:", data);
        if (data.userId !== user?.id) {
          alert("User joined chat: " + data.userId);
        }
      };

      const handleLeave = (data: { userId: string }) => {
        console.log("Leave event received:", data);
        if (data.userId !== user?.id) {
          alert("User left chat: " + data.userId);
        }
      };

      // Attach event listeners
      socket.on("join-private-chat", handleJoin);
      socket.on("leave-private-chat", handleLeave);

      // Cleanup function
      return () => {
        if (socket.connected) {
          //Leaving Room Emition
          socket.emit("leave-private-chat", {
            roomName: "private-chat-1",
            userId: user?.id,
          }, () => {
            console.log("Left room");
          });

          //Disconnecting socket
          disconnectSocket();
          socket.on("disconnect", () => {
            console.log("DISCONNECT TO SOCKET: ", socket.id);
          });
          socket.disconnect();
          hasJoinedRoom.current = false;
        }
      };
    }
  }, [disconnectSocket, isConnected, socket, user?.id]);


  const sendChatMessage = () => {
    alert("Chat message sent: " + chatInput);
    setChatInput("");
  };
  return (
    <>
      <SectionCard header="Private chat">
        {/* Chat Screen Wrapper */}
        <div className="w-full flex flex-row gap-2">
          {/* Wrapper for message area and input area */}
          <div className="h-[70vh] flex flex-col w-3/4">
            {/* Message area */}
            <section className="basis-[90%] border-2 border-slate-800 rounded-md p-3">
              <h1>Chat</h1>
            </section>

            {/* Input Area with Send Button */}
            <section className="basis-[10%] border-2 border-slate-800 rounded-md">
              <div className="flex flex-row w-full  h-full">
                <input
                  required
                  min={3}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm  px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow basis-[90%]"
                />
                <button
                  onClick={sendChatMessage}
                  type="button"
                  className="bg-slate-800 text-white w-full h-full basis-[10%] hover:bg-white hover:text-slate-800 cursor-pointer hover:border-2 hover:rounded-md hover:border-slate-800"
                >
                  Send
                </button>
              </div>
            </section>
          </div>
          {/* Participant Area */}
          <aside className="border-2 border-slate-800 rounded-md w-1/4">
            <h1>Participants</h1>
          </aside>
        </div>
      </SectionCard>
    </>
  );
};

export default PrivateChatPage;



  //Fully working page wise socket implementation
  // useEffect(() => {
  //   const socket = io("http://localhost:8080", {
  //     auth: { token: user!.token }
  //   });

  //   socket.on("connect", () => {
  //     console.log("CONNECT TO SOCKET: ", socket.id);
  //   });

  //   socket.emit("join-private-chat", {
  //     roomName: "private-chat-1",
  //     userId: user?.id,
  //   });

  //   const handleJoin = (data: { userId: string }) => {
  //     console.log("Join event received:", data);
  //     if (data.userId !== user?.id) {
  //       alert("User joined chat: " + data.userId);
  //     }
  //   };

  //   const handleLeave = (data: { userId: string }) => {
  //     console.log("Leave event received:", data);
  //     if (data.userId !== user?.id) {
  //       alert("User left chat: " + data.userId);
  //     }
  //   };

  //   socket.on("join-private-chat", handleJoin);
  //   socket.on("leave-private-chat", handleLeave);

  //   return () => {
  //     socket.emit("leave-private-chat", {
  //       roomName: "private-chat-1",
  //       userId: user?.id,
  //     });
  //     socket.on("disconnect", () => {
  //       console.log("DISCONNECT TO SOCKET: ", socket.id);
  //     });

  //     socket.disconnect();
  //   };
  // }, [user]);