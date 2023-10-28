import { WebSocket, WebSocketServer } from "ws";
import reg from "./reg.js";

const webSockedServer = new WebSocketServer({port: 3000});
let sokets = new Set;
let userSoketMap = new Map;


webSockedServer.on('connection', (soket) => {
    console.log('New connection opened')
    sokets.add(soket)

    soket.on('message', (message) => {
        const messageType = JSON.parse(message.toString()).type;
        console.log('request: ', messageType);

        switch (messageType) {
            case 'reg':
                const UserName = JSON.parse(JSON.parse(message.toString()).data).name;
                userSoketMap.set(UserName, soket)
                console.log(UserName);
                const responseMessage = JSON.stringify(reg(message));
                soket.send(responseMessage);
                break;
            case 'create_room':
                

               
        }

    })
})
