import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as ServerIO } from 'socket.io';
import IOController from "./controllers/IOController.js";
import * as MSG from '../server/scripts/message.js';
import { Socket } from 'dgram';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const port = 3000;
server.listen(port);
console.log(`>>> server running on port ${port} <<<`);

const io = new ServerIO(server);
const ioController = new IOController(io);

io.on("connection", socket => {ioController.registerSocket(socket)});
