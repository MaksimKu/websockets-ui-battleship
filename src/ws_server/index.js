import { WebSocket, WebSocketServer } from "ws";
import reg from "./reg.js";

const webSockedServer = new WebSocketServer({port: 3000});
let sokets = new Set;
let userSoketMap = new Map;
let roomList = [];


webSockedServer.on('connection', (soket) => {
    console.log('New connection opened')
    console.log(sokets.length)
    sokets.add(soket)

    soket.on('message', (message) => {
        const messageType = JSON.parse(message.toString()).type;
        console.log('request: ', messageType);
        let UserName;

        switch (messageType) {
            case 'reg':
                UserName = JSON.parse(JSON.parse(message.toString()).data).name;
                userSoketMap.set(UserName, soket)
                console.log(UserName);
                const responseMessage = JSON.stringify(reg(message));
                soket.send(responseMessage);
                break;
            case 'create_room':
                console.log(JSON.parse(message.toString()));
                roomList.push(
                    {
                        roomId: roomList.length,
                        roomUsers: [
                            {
                                name: UserName,

                            }
                        ]
                    }
                )

                let i = JSON.stringify(
                    {
                        type: "create_game",
                        data: JSON.stringify({
                            idGame: 1,
                            idPlayer: 1
                        }),
                        index: 0
                    }
                );
                console.log(i);
                soket.send(i)
                
               
        }

    })
})
