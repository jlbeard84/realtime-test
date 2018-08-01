import * as express from "express";
import * as http from "http";
import * as io from "socket.io";
import { AddressInfo } from "net";

const app = express();
const server = http.createServer(app);
const ioServer = io(server);

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

ioServer.on("connection", (socket: io.Socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.on("chat", (message: string) => {
        if (!message) {
            console.log("invalid chat command received");
            return;
        }

        //socket.broadcast.emit("chat", message);
        ioServer.emit("chat", message);
    });
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port}`);
});