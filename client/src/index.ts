import * as io from "socket.io-client";

import { Environment } from "./environment";

const environment = new Environment();
const socket = io(environment.getServerUrl());

const buttonElement = document.querySelector("#m_btn");
const valueElement = document.querySelector("#m");
const messageWindowElement = document.querySelector("#messages");

if (buttonElement) {
    buttonElement.addEventListener("click", (event) => {
        event.preventDefault();

        if (valueElement && valueElement as HTMLInputElement) {
            const input = valueElement as HTMLInputElement;
            const value = input.value;

            if (!value) {
                return 
            }

            console.log(input.value);
            socket.emit("chat", value);
            input.value = "";
        }
    });
}

socket.on("chat", (message: string) => {
    if (!message) {
        console.log("invalid chat message received");
        return;
    }

    if (messageWindowElement && messageWindowElement as HTMLUListElement) {
        const messageWindow = messageWindowElement as HTMLUListElement;
        
        const listElement = document.createElement("li");
        listElement.innerHTML = message;

        messageWindow.appendChild(listElement);
    }
});