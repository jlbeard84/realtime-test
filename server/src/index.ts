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
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port}`);
});