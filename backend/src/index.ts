import { WebSocketServer } from 'ws';
import { CREATE_ROOM, JOIN_ROOM } from './classes/messages';
import { RoomManager } from './classes/roomManager';

const wss = new WebSocketServer({ port: 8080 });

const roomManager = new RoomManager();


wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', (data) => {
        const message = JSON.parse(data.toString());

        if(message.type ===  CREATE_ROOM){
            roomManager.createRoom(message.roomName, ws, message.usersName )
        }

        if(message.type === JOIN_ROOM){
            roomManager.joinRoom(message.roomId, ws, message.usersName )
        }

        console.log("User Connected");
    
    })

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

  
});