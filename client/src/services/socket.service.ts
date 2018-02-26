import * as io from 'socket.io-client';

export class SocketService {

    public getSocket() {
        return io('http://localhost:3200');
    }

}