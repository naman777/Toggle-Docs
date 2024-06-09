import { v4 as uuidv4 } from 'uuid';
import WebSocket from 'ws';

export class Room {
    public id: string;
    private name: string;
    private users: WebSocket[];
    private usersName: string[]

    constructor(roomName: string, socket: WebSocket, usersName: string) {
        this.id = uuidv4();
        this.name = roomName;
        this.users = [];
        this.usersName = [];
        this.addUser(socket, usersName);
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
        
    }

    removeUser(socket: WebSocket): void {
        this.users = this.users.filter(user => user !== socket);
    }

    broadcastMessage(message: string): void {
        this.users.forEach(user => {
            user.send(message);
        });
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getUsers(): WebSocket[] {
        return this.users;
    }
}
