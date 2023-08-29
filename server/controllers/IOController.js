import { Socket } from 'socket.io';
import * as MSG from '../scripts/message.js';

export default class IOController
{
    #io;
    #clients;
    constructor(io) {
        this.#io = io;
        this.#clients = [];
    }

    /**
     * the maximum possible registration is 2.
     * @returns {boolean}
     */
    registrationClosed()
    {
        return this.#clients.length == 2;
    }

    setupListeners(socket)
    {   
        socket.on(MSG.CENTRALISE_PADDLE, () => this.notifyOtherPlayer(socket.id, MSG.CENTRALISE_PADDLE,""));

        // notify a player that his opponent moved
        socket.on(MSG.PLAYER_ACTION, new_position => this.notifyOtherPlayer(socket.id, MSG.OPPONENT_ACTION,new_position));
        
        // notify a player that his opponent left the game
        socket.on('disconnect', () => this.disconnectionSocket(socket));

        // notify a player that the ball moved
        socket.on(MSG.BALL_ACTION, ballPosition => this.notifyOtherPlayer(socket.id, MSG.BALL_ACTION,ballPosition));

        // notify the player on reception of message
        socket.on(MSG.CHAT_MESSAGE, msg => this.chatOtherPlayer(socket.id, msg));

        // When a player want to leave the game, we send him a good bye notification.
        socket.on(MSG.BYE, ()=> this.#io.to(socket.id).emit(MSG.BYE, "Hoping to see you soon, good bye!"));
        
    }

    chatOtherPlayer(socketId, msg){
        const othersPlayersId = this.#clients.filter( id => id != socketId);
        othersPlayersId.forEach( id => this.#io.to(id).emit(MSG.CHAT_MESSAGE, msg));

    }

    registerSocket(socket){
        console.log(`Connection done by client with id: ${socket.id}`);
        const nb_of_clients = this.#clients.length; // number of clients already connect
        if(this.registrationClosed()){
            this.#io.to(socket.id).emit(MSG.CONNECTION_REFUSED, "Maximum of client on the server reached. GOOD BYE");
        }
        else{
            this.#io.to(socket.id).emit(MSG.NOTIFICATION, `Player ${nb_of_clients+1}`);
            if (nb_of_clients === 0){ // the player is the first. wait for another.
                this.#io.to(socket.id).emit(MSG.CONTROLLED_PADDLE, `left`);
                this.#io.to(socket.id).emit(MSG.WAIT_NOTIFICATION, `Wait for your opponent`);
            } else {
                this.#io.to(socket.id).emit(MSG.CONTROLLED_PADDLE, `right`);

                // the game can start
                this.start_the_timer();
            }
            this.#clients.push(socket.id);
            this.setupListeners(socket);
        }
        
    }

    /**
     * Start a timer and then start the game
     */
    start_the_timer(){
        var second = 3;
        
        const myInterval = setInterval(
            () =>{
                this.#io.emit(MSG.TIMER, `The game starts in ${second}`);
                second -= 1;
            }, 1000);

        setTimeout(() => {
            clearInterval(myInterval);
            this.#io.emit(MSG.START_THE_GAME_NOTIFICATION, `May the best wins!!`);
        }, (second+2)*1000);
    }

    disconnectionSocket(socket){
        console.log(`Log out by client with id: ${socket.id}`);
        
        this.notifyOtherPlayer(socket.id, MSG.DISCONNECTION_NOTIFICATION, "disconnection from your opponent");
        this.#clients = this.#clients.filter( id => socket.id != id); // supprimer le socket deconnecté.
    }

    /**
     * Notify the other player that his opponent has moved
     * @param {the id of socket that moved}} socket_id
     * @param {the event to send} event
     * @param {the message to send} message
     */
    notifyOtherPlayer(socket_id, event, message){
        const other_paddle_id = this.#clients.filter( id => id != socket_id);
        other_paddle_id.forEach( id => this.#io.to(id).emit(event, message));
    }
}