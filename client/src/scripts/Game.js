import Ball from './Ball.js';
import Paddle from "./Paddle";
import * as MSG from '../../../server/scripts/message.js';

const SHIFT_SCORE = 10; /**static variable */
const SHIFT_Y = 10;
const PADDLE_IMAGE_SRC = './images/paddle.png';

/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {
    /**
     * build a Game
     *
     * @param  {Canvas} canvas the canvas of the game
     */
    constructor(canvas)
    {
        this.canvas = canvas;
        this.controlledPaddle = null;
        this.unControlledPaddle = null; 
        this.first_player = false;
        this.raf = null;
        this.socket = null;

        const img = new Image();
        img.addEventListener('load', ()=> {
            this.paddleLeft = new Paddle(10, this.canvas.height/2,SHIFT_Y, this);
            this.paddleRight = new Paddle(this.canvas.width - img.width - 10, this.canvas.height/2,SHIFT_Y, this);
        });
        img.src = PADDLE_IMAGE_SRC;
        this.initBall();
    }

    /**
     * initialise le socket
     */
    initSocket()
    {
        this.socket = io();
        this.setupListener();
    }

    writeOnWebSite(information){
        document.getElementById('server_message').innerHTML = information;
    }

    /**
     * gestion des evnements auquels doit reagir le client
     */
    setupListener()
    {   
        // Notification to centralise the paddle.
        this.socket.on(MSG.CENTRALISE_PADDLE, () => this.controlledPaddle.setY(this.canvas.height/2));

        // A notification from the server
        this.socket.on(MSG.NOTIFICATION, information => {
            document.getElementById('player_id').innerHTML = information
        });

        // Server notification about who is the left player and who's the right player
        this.socket.on(MSG.CONTROLLED_PADDLE, msg => {
            if(msg === 'left'){
                this.controlledPaddle = this.paddleLeft;
                this.unControlledPaddle = this.paddleRight;
                this.first_player = true;
            } else{
                this.controlledPaddle = this.paddleRight;
                this.unControlledPaddle = this.paddleLeft;
            }
        });

        // quand un client se deconnect, le 2nd est notifié.
        this.socket.on(
            MSG.DISCONNECTION_NOTIFICATION,
            msg => {
                this.writeOnWebSite(msg)
                this.stop();
            });

        // Wait a second player notification from the server
        this.socket.on(MSG.WAIT_NOTIFICATION, msg =>this.writeOnWebSite(msg));

        this.socket.on(MSG.TIMER, msg =>this.writeOnWebSite(msg));

        // Start the game notification from the server
        this.socket.on(
            MSG.START_THE_GAME_NOTIFICATION,
            msg => {
                this.writeOnWebSite(msg)
                this.start();
            }
        );
        
        // Obtain the opponent's position
        this.socket.on(MSG.OPPONENT_ACTION, 
            opponent_new_position => {
                this.unControlledPaddle.setY(opponent_new_position);
            }
        );
        
        // Inform the player that the maximum player on the server is reached 
        this.socket.on(MSG.CONNECTION_REFUSED, 
            msg => {
            this.writeOnWebSite(msg);
            document.getElementById('start').value = 'connect';
            }
        );
        
        // Obtain the ball's position on the canvas
        this.socket.on(MSG.BALL_ACTION, ballePosition => {
            this.ball.setPosition(ballePosition);
        });

        this.socket.on(MSG.CHAT_MESSAGE, msg => this.displayMsg(msg, 'received'));
    }


    disconnectSocket()
    {   this.socket.emit(MSG.BYE, "I quit the game, bye"); 


        this.socket.on(MSG.BYE, msg => {
            this.writeOnWebSite(msg);
            this.socket.close();
        });
        
    }

    /**
    * Create a new Ball.
    */
    initBall(){
      this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    }

    get SHIFT_SCORE() {
        return SHIFT_SCORE;
    }

    get gameCanvas()
    {
        return this.canvas;
    }
    /** start this game animation */
    start()
    {
        this.animate();
    }
    /** stop this game animation */
    stop()
    {
        window.cancelAnimationFrame(this.raf);
    }

    /** animate the game : move and draw */
    animate() {
        this.moveAndDraw();
        this.raf = window.requestAnimationFrame(this.animate.bind(this));
    }
    /** move then draw the bouncing ball */
    moveAndDraw()
    {
        const ctxt = this.canvas.getContext("2d");
        ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // draw and move the ball
        this.paddleLeft.move();
        this.paddleLeft.draw(ctxt);
        this.paddleRight.move();
        this.paddleRight.draw(ctxt);

        this.ball.move();
        this.ball.draw(ctxt);
    }

    keyDownActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "UP":
                this.controlledPaddle.moveUp();
                break;
            case "ArrowDown":
            case "DOWN":
                this.controlledPaddle.moveDown();
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case " ":
            case "Spacebar":
                this.centralize_paddles();
                this.initBall();
                this.socket.emit(MSG.BALL_ACTION, this.ball.position());
                
                break;
            case "ArrowUp":
            case "UP":
            case "ArrowDown":
            case "DOWN":
                this.controlledPaddle.stopMoving();
            default:
                return;
        }
    }
    /**
     * refresh the score on the website.
     */
    refreshScore(){
        const ecranScorePaddleLeft = document.getElementById("score_paddle_left");
        ecranScorePaddleLeft.innerText = this.paddleLeft.score;

        const ecranScorePaddleRight = document.getElementById("score_paddle_right");
        ecranScorePaddleRight.innerText = this.paddleRight.score;
    }
    /**
     * Notify the server about the current player's paddle's position 
     * and the ball's position.
     */
    notifyServer(){
        this.socket.emit(MSG.PLAYER_ACTION, this.controlledPaddle.y);

        if(this.first_player) {
            this.socket.emit(MSG.BALL_ACTION, this.ball.position());
        }
    }
    /**
     * Centralize the current player's paddle and 
     * notify his opponent to centralize his paddle.
     */
    centralize_paddles(){
        this.controlledPaddle.setY(this.canvas.height/2); // centralize the current player's paddle
        this.socket.emit(MSG.CENTRALISE_PADDLE, ""); // tell to his opponent to centralize his paddle   
    }

    displayMsg(msg, status)
    {
        const messages = document.getElementById("messages");
        const item = document.createElement('li');
        item.textContent = msg + ` \t (${status})`;
        messages.appendChild(item);
    }
    
    sendMsg() {
        const input_element = document.getElementById('input');
        const msg_contain = input_element.value;
        this.displayMsg(msg_contain, 'sent');
        this.socket.emit(MSG.CHAT_MESSAGE, msg_contain);
    }
}