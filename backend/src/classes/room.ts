import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'ws';
import { Document } from './document';

export class Room {
    public id: string;
    private name: string;
    private users: WebSocket[];
    private usersName: string[];
    private documentTitle: string;
    private documentContent: string;

    constructor(roomName: string, socket: WebSocket, userName: string, documentTitle: string) {
        this.id = uuidv4().slice(0, 4);
        this.name = roomName;
        this.users = [];
        this.usersName = [];
        this.addUser(socket, userName);
        this.documentTitle = documentTitle;
        this.documentContent = "";
    }

    addUser(socket: WebSocket, userName: string): void {
        this.users.push(socket);
        this.usersName.push(userName);

        socket.send(JSON.stringify({
            type: 'roomJoined',
            roomName: this.name,
            users: this.usersName,
            roomId: this.id,
            documentTitle: this.documentTitle
        }));
            
        this.broadcastMessage(JSON.stringify({
            type: 'updateUsers',
            users: this.usersName
        }), socket);
    }

    addContent(newContent: string): void {
        this.documentContent = newContent;

        this.broadcastMessage(JSON.stringify({
            type: 'documentEdited',
            content: this.documentContent
        }));
    }

    saveContent(content: string): void {
        this.documentContent = content;

        this.broadcastMessage(JSON.stringify({
            type: 'documentSaved',
            content: this.documentContent
        }));
    }

    removeUser(socket: WebSocket): void {
        const index = this.users.indexOf(socket);
        if (index !== -1) {
            this.users.splice(index, 1);
            this.usersName.splice(index, 1);

            this.broadcastMessage(JSON.stringify({
                type: 'updateUsers',
                users: this.usersName
            }));
        }
    }

    broadcastMessage(message: string, excludeSocket?: WebSocket): void {
        this.users.forEach(user => {
            if (user !== excludeSocket) {
                user.send(message);
            }
        });
    }
}
