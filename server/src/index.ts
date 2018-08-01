import * as express from "express";
import * as http from "http";
import * as io from "socket.io";
import { AddressInfo } from "net";

import { CONNECTION_TYPE } from "../../common";

const app = express();
const server = http.createServer(app);
const ioServer = io(server);

ioServer.on(CONNECTION_TYPE.CONNECTION, (socket: io.Socket) => {
    console.log("A user connected");

    socket.on(CONNECTION_TYPE.DISCONNECT, () => {
        console.log("User disconnected");
    });

    socket.on(CONNECTION_TYPE.CHAT_MESSAGE, (message: string) => {
        if (!message) {
            console.log("invalid chat command received");
            return;
        }

        //socket.broadcast.emit("chat", message);
        ioServer.emit(CONNECTION_TYPE.CHAT_MESSAGE, message);
    });
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port}`);
});