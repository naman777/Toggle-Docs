import WebSocket from "ws";
import { Room } from "./room";

export class RoomManager {
    private user : WebSocket | null;
    private rooms : Room[];

    constructor (){
        this.rooms = [];
        this.user = null;
    }

    createRoom(roomName: string, socket: WebSocket, usersName: string) {
        const room = new Room(roomName, socket, usersName);
        this.rooms.push(room);
    }

    joinRoom(roomId:string, socket: WebSocket, usersName: string){
        const room = this.rooms.find((room) => room.id === roomId);
        if(room){
            room.addUser(socket, usersName);
        }
        else{
            socket.send("Invalid Room Id");
        }
    } 


}