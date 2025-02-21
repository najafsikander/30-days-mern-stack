import { Server, Socket } from "socket.io";
import { info } from "../utils/logger";

export const privateChatHandler = (io:Server, socket:Socket) => {
    socket.on('join-private-chat', ({roomName, userId}:{roomName:string, userId:string}) => {
        socket.join(roomName);
        info("Joined room: " + roomName + ", userId: " + userId);
        socket.to(roomName).emit("join-private-chat", { roomName: roomName, userId: userId });
    });

    socket.on('leave-private-chat', ({roomName, userId}:{roomName:string, userId:string}) => {
        socket.leave(roomName);
        info("Left room: " + roomName + ", userId: " + userId);
        socket.to(roomName).emit("leave-private-chat", { roomName: roomName, userId: userId });
    });
}