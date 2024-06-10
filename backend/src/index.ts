import { WebSocketServer } from 'ws';
import { ADD_CONTENT, CLOSE_ROOM, CREATE_ROOM, GET_CONTENT, JOIN_ROOM, SAVE_CONTENT } from './classes/messages';
import { RoomManager } from './classes/roomManager';
import mongoose from 'mongoose';

const wss = new WebSocketServer({ port: 8080 });

const roomManager = new RoomManager();

require('dotenv').config();

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', (data) => {
        const message = JSON.parse(data.toString());

        if(message.type ===  CREATE_ROOM){
            roomManager.createRoom(message.roomName, ws, message.usersName,message.documentTitle )
        }

        if(message.type === JOIN_ROOM){
            roomManager.joinRoom(message.roomId, ws, message.usersName )
        }

        if(message.type === ADD_CONTENT){
            roomManager.addContent(message.roomId, message.content, ws)
        }

        if(message.type === SAVE_CONTENT){
            roomManager.saveContent(message.roomId, message.content, message)
        }

        if(message.type === GET_CONTENT){
            roomManager.getContent(message.roomId, ws);
        }

        if(message.type === CLOSE_ROOM){
            roomManager.closeRoom(message.roomId);
        }
    
    })

    ws.on('close', () => {
        roomManager.handleDisconnect(ws);
    });

  
});


mongoose.connect(process.env.MONGO_URL!).then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));