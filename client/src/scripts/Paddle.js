'use strict';

import Mobile from './Mobile';

const PADDLE_IMAGE_SRC = './images/paddle.png';
const MoveState = { UP:0, DOWN:1, NONE : 2};
/**
 * a paddle is a mobile which can move along the vertical line
 */
export default class Paddle extends Mobile
{
    /**
     * constructor of the paddle.
     * @param x the paddle initial horizontal position
     * @param y the paddle initial vertical position
     * @param shiftX
     * @param shiftY
     * @param theGame
     */
    constructor(x, y,shiftY, theGame)
    {
        super(x, y, PADDLE_IMAGE_SRC, 0, shiftY);
        this.theGame = theGame;
        this.canvas = theGame.gameCanvas;
        this.moveState = MoveState.NONE;
        this.score = 0; // the score of this paddle
    }

    /**
     * move up the paddle.
     */
    moveUp()
    {
        this.moveState = MoveState.UP;
    }

    /**
     * move down the paddle.
     */
    moveDown()
    {
        this.moveState = MoveState.DOWN;
    }

    /**
     * stop moving the paddle.
     */
    stopMoving()
    {
        this.moveState = MoveState.NONE;
    }

    /**
     * manage the paddle move.
     * According to the moving state, the paddle coordinates change.
     */
    move()
    {
        if (this.moveState === MoveState.UP)
            this.y = Math.max(0, this.y - this.shiftY);
        if (this.moveState === MoveState.DOWN)
            this.y = Math.min(this.canvas.height - this.height, this.y + this.shiftY);
        
    }

    /**
     * update the score of this paddle.
     */
    updateScore(shift_score){
        this.score += shift_score;
    }

    /**
     * à changer. Mettre un vrai setter.
     * @param {*} new_y 
     */
    setY(new_y){
        this.y = new_y;
    }
}
