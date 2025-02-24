import { useEffect, useRef, useState } from "react";
import SectionCard from "../../../components/SectionCard";
import { useUser } from "../../../hooks/useUser";
import { useSocket } from "../../../hooks/useSocket";

type User = {
  userId: string;
  name: string;
};

type ChatMessage = {
  userId: string;
  message: string;
  msgTime: string;
};

const PrivateChatPage: React.FC = () => {
  const { user } = useUser();

  const { socket, isConnected, disconnectSocket } = useSocket();
  const [chatInput, setChatInput] = useState<string>("");
  const hasJoinedRoom = useRef(false);
  const [participants, setParticipants] = useState<Array<User> | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<ChatMessage> | null>(
    null
  );

  //UseEffect to get connection and establish socket events
  useEffect(() => {
    //If socket is connected
    if (socket && isConnected && !hasJoinedRoom.current) {
      console.log("Socket instance:", socket.id);
      hasJoinedRoom.current = true;

      if (user && user?.details) {
        const { firstName, lastName } = user.details;
        // Join room
        socket.emit("join-private-chat", {
          roomName: "private-chat-1",
          userId: user?.id,
          firstName: firstName,
          lastName: lastName,
        });
      }

      // Event handlers -> Join/Leave Room/Update Participants/Send Messages
      const handleJoin = (data: {
        userId: string;
        firstName: string;
        lastName: string;
      }) => {
        console.log("Join event received:", data);
        if (data.userId !== user?.id) {
          alert("User joined chat: " + data.userId);
        }
      };

      const handleParticipantsUpdate = (data: { users: Array<User> }) => {
        console.log("Participants update received: ", data);
        if (data.users && data.users.length > 0) {
          setParticipants(data.users);
        }
      };

      const handleMessageReceived = (data: {
        chatMessages: Array<ChatMessage>;
      }) => {
        console.log("Message received: " + data);
        setChatMessages(data.chatMessages);
      };

      const handleLeave = (data: { userId: string }) => {
        console.log("Leave event received:", data);
        if (data.userId !== user?.id) {
          alert("User left chat: " + data.userId);
        }
      };

      // Attach event listeners
      socket.on("join-private-chat", handleJoin);
      socket.on("update-users-list", handleParticipantsUpdate);
      socket.on("new-private-message", handleMessageReceived);
      socket.on("leave-private-chat", handleLeave);

      // Cleanup function
      return () => {
        if (socket.connected) {
          //Leaving Room Emition
          socket.emit(
            "leave-private-chat",
            {
              roomName: "private-chat-1",
              userId: user?.id,
            },
            () => {
              console.log("Left room");
            }
          );

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
  }, [disconnectSocket, isConnected, socket, user]);

  //Send chat messages
  const sendChatMessage = () => {
    alert("Chat message sent: " + chatInput);
    socket?.emit("new-private-message", {
      roomName: "private-chat-1",
      chatMessage: {
        userId: user?.id,
        message: chatInput,
        msgTime: new Date().toString(),
      },
    });
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
              <div className="h-[80%] overflow-y-scroll">
                {chatMessages &&
                  chatMessages.length > 0 &&
                  chatMessages.map((message) => (
                    <div key={`${message.userId}${message.msgTime}`} className="flex flex-row">
                      <p>{message.message}</p>
                    </div>
                  ))}
              </div>
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
            {participants &&
              participants.length > 0 &&
              participants.map((participant) => (
                <h3 key={participant.userId}>{participant.name}</h3>
              ))}
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
