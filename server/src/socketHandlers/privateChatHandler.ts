import { Server, Socket } from "socket.io";
import { info } from "../utils/logger.js";

type User = {
    userId: string;
    name: string;
}

type ChatMessage = {
    userId: string;
    name:string;
    message: string;
    msgTime: string;
}

//Participants in chant
const users: Array<User> = [];
//Chat messages
const chatMessages: Array<ChatMessage> = [];

export const privateChatHandler = (io: Server, socket: Socket) => {

    //Event fired when joining a room
    socket.on('join-private-chat', ({ roomName, userId, firstName, lastName }: { roomName: string, userId: string, firstName: string, lastName: string }) => {
        socket.join(roomName);
        addOrRemoveUser('add', userId, firstName, lastName);
        info("Joined room: " + roomName + ", userId: " + userId);
        info("USERS joined: " + JSON.stringify(users));
        socket.to(roomName).emit("join-private-chat", { roomName: roomName, userId: userId, firstName: firstName, lastName: lastName });
        io.to(roomName).emit("update-users-list", { users });
        io.to(roomName).emit("new-private-message", { roomName,chatMessages });
    });

    //Event fired when users sends a message
    socket.on('new-private-message', ({ roomName, chatMessage }: { roomName: string, chatMessage:ChatMessage }) => {
        info("PRE ADD MESSAGE: " + JSON.stringify(chatMessages));
        chatMessages.push(chatMessage);
        info("POST ADD MESSAGE: " + JSON.stringify(chatMessages));
        io.to(roomName).emit("new-private-message", { roomName,chatMessages });
    });

    //Event fired when leaving a room
    socket.on('leave-private-chat', ({ roomName, userId }: { roomName: string, userId: string }) => {
        socket.leave(roomName);
        addOrRemoveUser('remove', userId);
        info("Left room: " + roomName + ", userId: " + userId);
        socket.to(roomName).emit("leave-private-chat", { roomName: roomName, userId: userId });
        io.to(roomName).emit("update-users-list", { users })
    });

    //Helper function to update the participants when user joins or leaves a room
    const addOrRemoveUser = (action: string, userId: string, firstName?: string, lastName?: string) => {
        const userObj: User = {
            userId,
            name: `${firstName} ${lastName}`
        }

        if (action === 'add') {
            info("PRE ADD USERS: " + JSON.stringify(users));
            const user = users.find((user: User) => user.userId === userObj.userId);

            if (!user) {
                users.push(userObj);
                info("POST ADD USERS: " + JSON.stringify(users));
            }
        }

        if (action === 'remove') {
            info("PRE REMOVE USERS: " + JSON.stringify(users));
            const userIndex = users.findIndex((user: User) => user.userId === userObj.userId);
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
                info("POST REMOVE USERS: " + JSON.stringify(users));
                if(users.length === 0) chatMessages.length = 0;
            }
        }
    }
}