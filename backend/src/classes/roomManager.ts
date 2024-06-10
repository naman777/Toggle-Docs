import WebSocket from "ws";
import { Room } from "./room";
import mongoose from "mongoose";
import Data from "../db/schema";

export class RoomManager {
    private rooms : Room[];
    private socketAdminRoomMap: Map<WebSocket, string>;
    private socketRoomMap: Map<WebSocket, string>;

    constructor (){
        this.rooms = [];
        this.socketAdminRoomMap = new Map();
        this.socketRoomMap = new Map();
    }

    createRoom(roomName: string, socket: WebSocket, usersName: string, documentTitle:string) {
        const room = new Room(roomName, socket, usersName,documentTitle);
        this.rooms.push(room);
        this.socketAdminRoomMap.set(socket, room.id);
    }

    joinRoom(roomId:string, socket: WebSocket, usersName: string){
        const room = this.rooms.find((room) => room.id === roomId);
        if(room){
            room.addUser(socket, usersName);
            this.socketRoomMap.set(socket, room.id);
        }
        else{
            socket.send("Invalid Room Id");
        }
    }

    addContent(roomId:string, content: string, socket: WebSocket){
        const room = this.rooms.find((room) => room.id === roomId);
        if(room){
            room.addContent(content);
        }
    }

    async saveContent(roomId:string, content: string, message:any){
        const room = this.rooms.find((room) => room.id === roomId);
        if(room){
            room.saveContent(content);
        }

        const docs = new Data({
            roomId: roomId,
            documentContent: content
        });

        const saveDocs = await docs.save();
    }

    async getContent(roomId:string, socket: WebSocket){
        const docs = await Data.findOne({
            roomId: roomId
        })

        if(docs){
            socket.send(docs.documentContent!);
        }
        else{
            socket.send("No Content Found or Wrong Room Id");
        }
    }

    closeRoom(roomId: string) {
        const roomIndex = this.rooms.findIndex((room) => room.id === roomId);
        if (roomIndex !== -1) {
            this.rooms.splice(roomIndex, 1);
        } else {
            console.log("Room not found");
        }
    }

    handleDisconnect(socket: WebSocket) {
        const roomIdAdmin = this.socketAdminRoomMap.get(socket);
        if (roomIdAdmin) {
            this.closeRoom(roomIdAdmin);
            this.socketAdminRoomMap.delete(socket);
        }

        const roomId = this.socketAdminRoomMap.get(socket);
        if (roomId) {
            this.socketAdminRoomMap.delete(socket);
            const room = this.rooms.find((room) => room.id === roomId);
            if(room){
                room.removeUser(socket);
            }
        }

    }
}