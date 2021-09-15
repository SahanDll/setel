/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Injectable, Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

//@WebSocketGateway(80, {namespace: 'order'})
@WebSocketGateway(3003)
@Injectable()
export class OrderGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    private clients: Socket[] = []; 

    @WebSocketServer()
    wss : Server;

    private logger: Logger = new Logger('WebSocket');

    handleDisconnect(client: Socket) {
        this.clients = this.clients.filter((cli) => {
            return cli.id !== client.id;
          });
        this.logger.log('WS client disconnected ' + client.id);
    }
    handleConnection(client: Socket, ...args: any[]) {
        this.clients.push(client);
        this.logger.log('WS client connected ' + client.id);
    }

    afterInit(server: Server){
        this.logger.log('WS initialized')
    }

    @SubscribeMessage('request')
    handleMessage(client: Socket, payload: any): void{
        //this.server.emit('response', data);
        //return {event: 'msgToClient', data: 'Heloooooooo'}
        this.logger.log(payload)
        this.wss.emit('response', payload);
        client.emit('response', payload);
    }

    public pushData = (data) => {
        //this.logger.log("orders : "+ data)
        if(this.clients.length > 0){
            this.clients.slice(-1)[0].emit('orders', data);
        }
        //this.wss.emit('orders', data);
    }
}