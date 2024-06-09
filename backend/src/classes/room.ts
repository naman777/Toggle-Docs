import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'ws';
import { Document } from './document';

export class Room {
    public id: string;
    private name: string;
    private users: WebSocket[];
    private usersName: string[];
    private document: Document;

    constructor(roomName: string, socket: WebSocket, usersName: string) {
        this.id = uuidv4();
        this.name = roomName;
        this.users = [];
        this.usersName = [];
        this.addUser(socket, usersName);
        this.document = new Document();
    }

    addUser(socket: WebSocket, usersName: string): void {
        this.users.push(socket);
        this.usersName.push(usersName);

        socket.send(JSON.stringify({
            type: 'roomJoined',
            roomName: this.name,
            users: this.usersName,
            roomId: this.id
        }))

        this.broadcastMessage(JSON.stringify({
            type: 'updateUsers',
            users: this.usersName
        }));

    }


    addContent(newContent: string): void {
        this.document.setContent(newContent);
        this.broadcastMessage(JSON.stringify({
            type: 'documentEdited',
            content: newContent
        }));
    }

    saveContent(content: string){
        this.document.setContent(content);
        this.broadcastMessage(JSON.stringify({
            type: 'Document Saved',
            content: content
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
