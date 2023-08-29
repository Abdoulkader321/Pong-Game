import Mobile from './Mobile.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 8;
const SHIFT_Y = 4;

/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

    /**  build a ball
     *
     * @param  {number} x       the x coordinate
     * @param  {number} y       the y coordinate
     * @param  {Game} theGame   the Game this ball belongs to
     */
    constructor(x, y, theGame) {
        super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
        this.theGame = theGame;
    }

    position() {
        return [this.x, this.y, this.shiftX, this.shiftY];
    }

    setPosition(position){
        this.x = position[0];
        this.y = position[1];
        this.shiftX = position[2];
        this.shiftY = position[3];
    }
    /**
     * when moving a ball bounces inside the limit of its game's canvas
     */
    move(){
        const rebondAGauche = this.x <= 0 ;
        const rebondADroite = this.x + this.width >= this.theGame.canvas.width ;
        const rebondEnBas = this.y+this.height >= this.theGame.canvas.height;
        const rebondEnHaut = this.y <= 0 ;
        const collisionWithPaddleLeft = this.collisionWith(this.theGame.paddleLeft);
        const collisionWithPaddleRight = this.collisionWith(this.theGame.paddleRight);

        if (rebondEnHaut || rebondEnBas)
        {
            this.shiftY = - this.shiftY;    // rebond en haut ou en bas
        }
        else if (collisionWithPaddleLeft)
        {
            //Forcer la balle à l'exterieur de la palette.
            const paddle = this.theGame.paddleLeft;
            this.x = paddle.x + paddle.width;
            this.manageCollisionV1();
        }else if (collisionWithPaddleRight) {
            // forcer la balle à l'exterieur de la palette.
            const paddle = this.theGame.paddleRight;
            this.x = paddle.x - this.width;
            this.manageCollisionV1();
        }
        else if (rebondAGauche) {
            // rebond en gauche: Arreter la balle 
            this.shiftX = 0;
            this.shiftY = 0;
            this.x = this.theGame.paddleLeft.x + this.theGame.paddleLeft.width; // sans cette ligne, la balle va jusqu'a l'infini, 
                                                                                // et donc le score change avec
            this.theGame.paddleRight.updateScore(this.theGame.SHIFT_SCORE);
            this.theGame.refreshScore();
        } else if (rebondADroite) {
            // rebond à droite : Arreter la balle 
            this.shiftX = 0;
            this.shiftY = 0;
            this.x = this.theGame.paddleRight.x - this.theGame.paddleRight.width; // sans cette ligne, la balle va jusqu'a l'infini, 
                                                                                // et donc le score change avec
            this.theGame.paddleLeft.updateScore(this.theGame.SHIFT_SCORE);
            this.theGame.refreshScore();
        }
        super.move();
        this.theGame.notifyServer();
    }

    /**
     * check if a collision occured between the ball and another object.
     * @param {Obstacle} obstacle.
     * @return {boolean} true if a collision occured, false else.
     */
    collisionWith(obstacle)
    {
        let p1x = Math.max(this.x, obstacle.x);
        let p1y = Math.max(this.y, obstacle.y);
        let p2x = Math.min(this.x + this.width, obstacle.x + obstacle.width);
        let p2y = Math.min(this.y + this.width, obstacle.y + obstacle.height);

        return p1x < p2x && p1y < p2y;
    }

	manageCollisionV1()
	{
		this.shiftX = - this.shiftX;
	}
	manageCollisionV2() {
		this.shiftX = - this.shiftX;
	}
}
