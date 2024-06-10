import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'ws';
import { Document } from './document';

export class Room {
    public id: string;
    private name: string;
    private users: WebSocket[];
    private usersName: string[];
    private documentTitle : string
    private documnetContent: string;

    constructor(roomName: string, socket: WebSocket, usersName: string, documentTitle: string) {
        this.id = uuidv4();
        this.name = roomName;
        this.users = [];
        this.usersName = [];
        this.addUser(socket, usersName);
        this.documentTitle = documentTitle;
        this.documnetContent = "";
    }

    addUser(socket: WebSocket, usersName: string): void {
        this.users.push(socket);
        this.usersName.push(usersName);

        socket.send(JSON.stringify({
            type: 'roomJoined',
            roomName: this.name,
            users: this.usersName,
            roomId: this.id,
            documentTitle: this.documentTitle
        }))
            

        this.broadcastMessage(JSON.stringify({
            type: 'updateUsers',
            users: this.usersName
        }));

    }


    addContent(newContent: string): void {
        this.documnetContent = newContent;

        this.broadcastMessage(JSON.stringify({
            type: 'documentEdited',
            content: this.documnetContent
        }));
    }

    saveContent(content: string){
        this.documnetContent = content;
        this.broadcastMessage(JSON.stringify({
            type: 'documentSaved',
            content: this.documnetContent
        }));
    }

    removeUser(socket: WebSocket): void {
        this.users = this.users.filter(user => user !== socket);
        this.broadcastMessage(JSON.stringify({
            type: 'updateUsers',
            users: this.usersName
        }));

    }

    broadcastMessage(message: string): void {
        this.users.forEach(user => {
            user.send(message);
        });
    }

    
}
