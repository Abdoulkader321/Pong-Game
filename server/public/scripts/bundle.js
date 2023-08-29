/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/Ball.js":
/*!*****************************!*\
  !*** ./src/scripts/Ball.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ball)\n/* harmony export */ });\n/* harmony import */ var _Mobile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mobile.js */ \"./src/scripts/Mobile.js\");\n\r\n\r\n\r\n// default values for a Ball : image and shifts\r\nconst BALL_IMAGE_SRC = './images/balle24.png';\r\nconst SHIFT_X = 8;\r\nconst SHIFT_Y = 4;\r\n\r\n/**\r\n * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)\r\n */\r\nclass Ball extends _Mobile_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n\r\n    /**  build a ball\r\n     *\r\n     * @param  {number} x       the x coordinate\r\n     * @param  {number} y       the y coordinate\r\n     * @param  {Game} theGame   the Game this ball belongs to\r\n     */\r\n    constructor(x, y, theGame) {\r\n        super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);\r\n        this.theGame = theGame;\r\n    }\r\n\r\n    position() {\r\n        return [this.x, this.y, this.shiftX, this.shiftY];\r\n    }\r\n\r\n    setPosition(position){\r\n        this.x = position[0];\r\n        this.y = position[1];\r\n        this.shiftX = position[2];\r\n        this.shiftY = position[3];\r\n    }\r\n    /**\r\n     * when moving a ball bounces inside the limit of its game's canvas\r\n     */\r\n    move(){\r\n        const rebondAGauche = this.x <= 0 ;\r\n        const rebondADroite = this.x + this.width >= this.theGame.canvas.width ;\r\n        const rebondEnBas = this.y+this.height >= this.theGame.canvas.height;\r\n        const rebondEnHaut = this.y <= 0 ;\r\n        const collisionWithPaddleLeft = this.collisionWith(this.theGame.paddleLeft);\r\n        const collisionWithPaddleRight = this.collisionWith(this.theGame.paddleRight);\r\n\r\n        if (rebondEnHaut || rebondEnBas)\r\n        {\r\n            this.shiftY = - this.shiftY;    // rebond en haut ou en bas\r\n        }\r\n        else if (collisionWithPaddleLeft)\r\n        {\r\n            //Forcer la balle à l'exterieur de la palette.\r\n            const paddle = this.theGame.paddleLeft;\r\n            this.x = paddle.x + paddle.width;\r\n            this.manageCollisionV1();\r\n        }else if (collisionWithPaddleRight) {\r\n            // forcer la balle à l'exterieur de la palette.\r\n            const paddle = this.theGame.paddleRight;\r\n            this.x = paddle.x - this.width;\r\n            this.manageCollisionV1();\r\n        }\r\n        else if (rebondAGauche) {\r\n            // rebond en gauche: Arreter la balle \r\n            this.shiftX = 0;\r\n            this.shiftY = 0;\r\n            this.x = this.theGame.paddleLeft.x + this.theGame.paddleLeft.width; // sans cette ligne, la balle va jusqu'a l'infini, \r\n                                                                                // et donc le score change avec\r\n            this.theGame.paddleRight.updateScore(this.theGame.SHIFT_SCORE);\r\n            this.theGame.refreshScore();\r\n        } else if (rebondADroite) {\r\n            // rebond à droite : Arreter la balle \r\n            this.shiftX = 0;\r\n            this.shiftY = 0;\r\n            this.x = this.theGame.paddleRight.x - this.theGame.paddleRight.width; // sans cette ligne, la balle va jusqu'a l'infini, \r\n                                                                                // et donc le score change avec\r\n            this.theGame.paddleLeft.updateScore(this.theGame.SHIFT_SCORE);\r\n            this.theGame.refreshScore();\r\n        }\r\n        super.move();\r\n        this.theGame.notifyServer();\r\n    }\r\n\r\n    /**\r\n     * check if a collision occured between the ball and another object.\r\n     * @param {Obstacle} obstacle.\r\n     * @return {boolean} true if a collision occured, false else.\r\n     */\r\n    collisionWith(obstacle)\r\n    {\r\n        let p1x = Math.max(this.x, obstacle.x);\r\n        let p1y = Math.max(this.y, obstacle.y);\r\n        let p2x = Math.min(this.x + this.width, obstacle.x + obstacle.width);\r\n        let p2y = Math.min(this.y + this.width, obstacle.y + obstacle.height);\r\n\r\n        return p1x < p2x && p1y < p2y;\r\n    }\r\n\r\n\tmanageCollisionV1()\r\n\t{\r\n\t\tthis.shiftX = - this.shiftX;\r\n\t}\r\n\tmanageCollisionV2() {\r\n\t\tthis.shiftX = - this.shiftX;\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://client/./src/scripts/Ball.js?");

/***/ }),

/***/ "./src/scripts/Game.js":
/*!*****************************!*\
  !*** ./src/scripts/Game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Ball_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ball.js */ \"./src/scripts/Ball.js\");\n/* harmony import */ var _Paddle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Paddle */ \"./src/scripts/Paddle.js\");\n/* harmony import */ var _server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../server/scripts/message.js */ \"../server/scripts/message.js\");\n\r\n\r\n\r\n\r\nconst SHIFT_SCORE = 10; /**static variable */\r\nconst SHIFT_Y = 10;\r\nconst PADDLE_IMAGE_SRC = './images/paddle.png';\r\n\r\n/**\r\n * a Game animates a ball bouncing in a canvas\r\n */\r\nclass Game {\r\n    /**\r\n     * build a Game\r\n     *\r\n     * @param  {Canvas} canvas the canvas of the game\r\n     */\r\n    constructor(canvas)\r\n    {\r\n        this.canvas = canvas;\r\n        this.controlledPaddle = null;\r\n        this.unControlledPaddle = null; \r\n        this.first_player = false;\r\n        this.raf = null;\r\n        this.socket = null;\r\n\r\n        const img = new Image();\r\n        img.addEventListener('load', ()=> {\r\n            this.paddleLeft = new _Paddle__WEBPACK_IMPORTED_MODULE_1__[\"default\"](10, this.canvas.height/2,SHIFT_Y, this);\r\n            this.paddleRight = new _Paddle__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.canvas.width - img.width - 10, this.canvas.height/2,SHIFT_Y, this);\r\n        });\r\n        img.src = PADDLE_IMAGE_SRC;\r\n        this.initBall();\r\n    }\r\n\r\n    /**\r\n     * initialise le socket\r\n     */\r\n    initSocket()\r\n    {\r\n        this.socket = io();\r\n        this.setupListener();\r\n    }\r\n\r\n    writeOnWebSite(information){\r\n        document.getElementById('server_message').innerHTML = information;\r\n    }\r\n\r\n    /**\r\n     * gestion des evnements auquels doit reagir le client\r\n     */\r\n    setupListener()\r\n    {   \r\n        // Notification to centralise the paddle.\r\n        this.socket.on(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.CENTRALISE_PADDLE, () => this.controlledPaddle.setY(this.canvas.height/2));\r\n\r\n        // A notification from the server\r\n        this.socket.on(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.NOTIFICATION, information => {\r\n            document.getElementById('player_id').innerHTML = information\r\n        });\r\n\r\n        // Server notification about who is the left player and who's the right player\r\n        this.socket.on(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.CONTROLLED_PADDLE, msg => {\r\n            if(msg === 'left'){\r\n                this.controlledPaddle = this.paddleLeft;\r\n                this.unControlledPaddle = this.paddleRight;\r\n                this.first_player = true;\r\n            } else{\r\n                this.controlledPaddle = this.paddleRight;\r\n                this.unControlledPaddle = this.paddleLeft;\r\n            }\r\n        });\r\n\r\n        // quand un client se deconnect, le 2nd est notifié.\r\n        this.socket.on(\r\n            _server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.DISCONNECTION_NOTIFICATION,\r\n            msg => {\r\n                this.writeOnWebSite(msg)\r\n                this.stop();\r\n            });\r\n\r\n        // Wait a second player notification from the server\r\n        this.socket.on(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.WAIT_NOTIFICATION, msg =>this.writeOnWebSite(msg));\r\n\r\n        this.socket.on(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.TIMER, msg =>this.writeOnWebSite(msg));\r\n\r\n        // Start the game notification from the server\r\n        this.socket.on(\r\n            _server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.START_THE_GAME_NOTIFICATION,\r\n            msg => {\r\n                this.writeOnWebSite(msg)\r\n                this.start();\r\n            }\r\n        );\r\n        \r\n        // Obtain the opponent's position\r\n        this.socket.on(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.OPPONENT_ACTION, \r\n            opponent_new_position => {\r\n                this.unControlledPaddle.setY(opponent_new_position);\r\n            }\r\n        );\r\n        \r\n        // Inform the player that the maximum player on the server is reached \r\n        this.socket.on(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.CONNECTION_REFUSED, \r\n            msg => {\r\n            this.writeOnWebSite(msg);\r\n            document.getElementById('start').value = 'connect';\r\n            }\r\n        );\r\n        \r\n        // Obtain the ball's position on the canvas\r\n        this.socket.on(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.BALL_ACTION, ballePosition => {\r\n            this.ball.setPosition(ballePosition);\r\n        });\r\n\r\n        this.socket.on(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.CHAT_MESSAGE, msg => this.displayMsg(msg, 'received'));\r\n    }\r\n\r\n\r\n    disconnectSocket()\r\n    {   this.socket.emit(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.BYE, \"I quit the game, bye\"); \r\n\r\n\r\n        this.socket.on(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.BYE, msg => {\r\n            this.writeOnWebSite(msg);\r\n            this.socket.close();\r\n        });\r\n        \r\n    }\r\n\r\n    /**\r\n    * Create a new Ball.\r\n    */\r\n    initBall(){\r\n      this.ball = new _Ball_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.canvas.width/2, this.canvas.height/2, this);\r\n    }\r\n\r\n    get SHIFT_SCORE() {\r\n        return SHIFT_SCORE;\r\n    }\r\n\r\n    get gameCanvas()\r\n    {\r\n        return this.canvas;\r\n    }\r\n    /** start this game animation */\r\n    start()\r\n    {\r\n        this.animate();\r\n    }\r\n    /** stop this game animation */\r\n    stop()\r\n    {\r\n        window.cancelAnimationFrame(this.raf);\r\n    }\r\n\r\n    /** animate the game : move and draw */\r\n    animate() {\r\n        this.moveAndDraw();\r\n        this.raf = window.requestAnimationFrame(this.animate.bind(this));\r\n    }\r\n    /** move then draw the bouncing ball */\r\n    moveAndDraw()\r\n    {\r\n        const ctxt = this.canvas.getContext(\"2d\");\r\n        ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n        // draw and move the ball\r\n        this.paddleLeft.move();\r\n        this.paddleLeft.draw(ctxt);\r\n        this.paddleRight.move();\r\n        this.paddleRight.draw(ctxt);\r\n\r\n        this.ball.move();\r\n        this.ball.draw(ctxt);\r\n    }\r\n\r\n    keyDownActionHandler(event) {\r\n        switch (event.key) {\r\n            case \"ArrowUp\":\r\n            case \"UP\":\r\n                this.controlledPaddle.moveUp();\r\n                break;\r\n            case \"ArrowDown\":\r\n            case \"DOWN\":\r\n                this.controlledPaddle.moveDown();\r\n                break;\r\n            default:\r\n                return;\r\n        }\r\n        event.preventDefault();\r\n    }\r\n\r\n    keyUpActionHandler(event) {\r\n        switch (event.key) {\r\n            case \" \":\r\n            case \"Spacebar\":\r\n                this.centralize_paddles();\r\n                this.initBall();\r\n                this.socket.emit(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.BALL_ACTION, this.ball.position());\r\n                \r\n                break;\r\n            case \"ArrowUp\":\r\n            case \"UP\":\r\n            case \"ArrowDown\":\r\n            case \"DOWN\":\r\n                this.controlledPaddle.stopMoving();\r\n            default:\r\n                return;\r\n        }\r\n    }\r\n    /**\r\n     * refresh the score on the website.\r\n     */\r\n    refreshScore(){\r\n        const ecranScorePaddleLeft = document.getElementById(\"score_paddle_left\");\r\n        ecranScorePaddleLeft.innerText = this.paddleLeft.score;\r\n\r\n        const ecranScorePaddleRight = document.getElementById(\"score_paddle_right\");\r\n        ecranScorePaddleRight.innerText = this.paddleRight.score;\r\n    }\r\n    /**\r\n     * Notify the server about the current player's paddle's position \r\n     * and the ball's position.\r\n     */\r\n    notifyServer(){\r\n        this.socket.emit(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.PLAYER_ACTION, this.controlledPaddle.y);\r\n\r\n        if(this.first_player) {\r\n            this.socket.emit(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.BALL_ACTION, this.ball.position());\r\n        }\r\n    }\r\n    /**\r\n     * Centralize the current player's paddle and \r\n     * notify his opponent to centralize his paddle.\r\n     */\r\n    centralize_paddles(){\r\n        this.controlledPaddle.setY(this.canvas.height/2); // centralize the current player's paddle\r\n        this.socket.emit(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.CENTRALISE_PADDLE, \"\"); // tell to his opponent to centralize his paddle   \r\n    }\r\n\r\n    displayMsg(msg, status)\r\n    {\r\n        const messages = document.getElementById(\"messages\");\r\n        const item = document.createElement('li');\r\n        item.textContent = msg + ` \\t (${status})`;\r\n        messages.appendChild(item);\r\n    }\r\n    \r\n    sendMsg() {\r\n        const input_element = document.getElementById('input');\r\n        const msg_contain = input_element.value;\r\n        this.displayMsg(msg_contain, 'sent');\r\n        this.socket.emit(_server_scripts_message_js__WEBPACK_IMPORTED_MODULE_2__.CHAT_MESSAGE, msg_contain);\r\n    }\r\n}\n\n//# sourceURL=webpack://client/./src/scripts/Game.js?");

/***/ }),

/***/ "./src/scripts/Mobile.js":
/*!*******************************!*\
  !*** ./src/scripts/Mobile.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Mobile)\n/* harmony export */ });\n/**\r\n  A mobile is defined by its coordinates, an image and a \"speed\" defined by horizontal and vertical shift values\r\n*/\r\nclass Mobile {\r\n  /**\r\n   * buils a Mobile\r\n   *\r\n   * @param  {number} x          the x coordinate of this mobile\r\n   * @param  {number} y          the y coordinate of this mobile\r\n   * @param  {string} imgSrc     this mobile's image src\r\n   * @param  {number} shiftX = 0 the horizontal shift \"speed\"\r\n   * @param  {number} shiftY = 0 the vertical shift \"speed\"\r\n   */\r\n  constructor(x, y, imgSrc, shiftX = 0, shiftY = 0) {\r\n    this.y = y;\r\n    this.x = x;\r\n    this.img = new Image();\r\n    this.img.src = imgSrc;\r\n    this.shiftX = shiftX;\r\n    this.shiftY = shiftY;\r\n  }\r\n\r\n  /** @return {number} the width of the mobile, ie. its images's width */\r\n  get width() {\r\n    return this.img.width;\r\n  }\r\n  /** @return {number} the width of the mobile, ie. its images's height */\r\n  get height() {\r\n    return this.img.height;\r\n  }\r\n  /** this mobile moves : horizontal and vertical shifts are added to coordinates */\r\n  move() {\r\n    this.x = this.x + this.shiftX;\r\n    this.y = this.y + this.shiftY;\r\n    \r\n  }\r\n  /** draw this mobile's image at its coordinates in the given context\r\n  * @param {CanvasRenderingContext2D} ctxt - the drawing context\r\n  */\r\n  draw(ctxt) {\r\n    ctxt.drawImage(this.img,this.x,this.y);\r\n  }\r\n  /** this mobile stops moving : speed becomes 0 */\r\n  stopMoving() {\r\n    this.shiftX = 0;\r\n    this.shiftY = 0;\r\n  }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://client/./src/scripts/Mobile.js?");

/***/ }),

/***/ "./src/scripts/Paddle.js":
/*!*******************************!*\
  !*** ./src/scripts/Paddle.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Paddle)\n/* harmony export */ });\n/* harmony import */ var _Mobile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mobile */ \"./src/scripts/Mobile.js\");\n\n\n\n\nconst PADDLE_IMAGE_SRC = './images/paddle.png';\nconst MoveState = { UP:0, DOWN:1, NONE : 2};\n/**\n * a paddle is a mobile which can move along the vertical line\n */\nclass Paddle extends _Mobile__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n{\n    /**\n     * constructor of the paddle.\n     * @param x the paddle initial horizontal position\n     * @param y the paddle initial vertical position\n     * @param shiftX\n     * @param shiftY\n     * @param theGame\n     */\n    constructor(x, y,shiftY, theGame)\n    {\n        super(x, y, PADDLE_IMAGE_SRC, 0, shiftY);\n        this.theGame = theGame;\n        this.canvas = theGame.gameCanvas;\n        this.moveState = MoveState.NONE;\n        this.score = 0; // the score of this paddle\n    }\n\n    /**\n     * move up the paddle.\n     */\n    moveUp()\n    {\n        this.moveState = MoveState.UP;\n    }\n\n    /**\n     * move down the paddle.\n     */\n    moveDown()\n    {\n        this.moveState = MoveState.DOWN;\n    }\n\n    /**\n     * stop moving the paddle.\n     */\n    stopMoving()\n    {\n        this.moveState = MoveState.NONE;\n    }\n\n    /**\n     * manage the paddle move.\n     * According to the moving state, the paddle coordinates change.\n     */\n    move()\n    {\n        if (this.moveState === MoveState.UP)\n            this.y = Math.max(0, this.y - this.shiftY);\n        if (this.moveState === MoveState.DOWN)\n            this.y = Math.min(this.canvas.height - this.height, this.y + this.shiftY);\n        \n    }\n\n    /**\n     * update the score of this paddle.\n     */\n    updateScore(shift_score){\n        this.score += shift_score;\n    }\n\n    /**\n     * à changer. Mettre un vrai setter.\n     * @param {*} new_y \n     */\n    setY(new_y){\n        this.y = new_y;\n    }\n}\n\n\n//# sourceURL=webpack://client/./src/scripts/Paddle.js?");

/***/ }),

/***/ "./src/scripts/pong.js":
/*!*****************************!*\
  !*** ./src/scripts/pong.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game.js */ \"./src/scripts/Game.js\");\n\r\n\r\n\r\n\r\nconst init = () => {\r\n  const theField = document.getElementById(\"field\");\r\n  const theGame = new _Game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](theField);\r\n\r\n  document.getElementById('start').addEventListener(\"click\", () => startGame(theGame) );\r\n  window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));\r\n  window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));\r\n  document.getElementById(\"send_msg\").addEventListener('click', () => theGame.sendMsg());\r\n}\r\n\r\nwindow.addEventListener(\"load\",init);\r\n\r\n// true iff game is started\r\nlet started = false;\r\n/** start and stop a game\r\n * @param {Game} theGame - the game to start and stop\r\n */\r\nconst startGame = theGame => {\r\n  if (!started) {\r\n    theGame.initSocket();\r\n    document.getElementById('start').value = 'disconnect';\r\n  }\r\n  else {\r\n    document.getElementById('start').value = 'connect';\r\n    theGame.disconnectSocket();\r\n  }\r\n  started = ! started;\r\n}\n\n//# sourceURL=webpack://client/./src/scripts/pong.js?");

/***/ }),

/***/ "../server/scripts/message.js":
/*!************************************!*\
  !*** ../server/scripts/message.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WAIT_NOTIFICATION\": () => (/* binding */ WAIT_NOTIFICATION),\n/* harmony export */   \"START_THE_GAME_NOTIFICATION\": () => (/* binding */ START_THE_GAME_NOTIFICATION),\n/* harmony export */   \"DISCONNECTION_NOTIFICATION\": () => (/* binding */ DISCONNECTION_NOTIFICATION),\n/* harmony export */   \"NOTIFICATION\": () => (/* binding */ NOTIFICATION),\n/* harmony export */   \"PLAYER_ACTION\": () => (/* binding */ PLAYER_ACTION),\n/* harmony export */   \"CONNECTION_REFUSED\": () => (/* binding */ CONNECTION_REFUSED),\n/* harmony export */   \"CONTROLLED_PADDLE\": () => (/* binding */ CONTROLLED_PADDLE),\n/* harmony export */   \"OPPONENT_ACTION\": () => (/* binding */ OPPONENT_ACTION),\n/* harmony export */   \"BALL_ACTION\": () => (/* binding */ BALL_ACTION),\n/* harmony export */   \"CHAT_MESSAGE\": () => (/* binding */ CHAT_MESSAGE),\n/* harmony export */   \"CENTRALISE_PADDLE\": () => (/* binding */ CENTRALISE_PADDLE),\n/* harmony export */   \"TIMER\": () => (/* binding */ TIMER),\n/* harmony export */   \"BYE\": () => (/* binding */ BYE)\n/* harmony export */ });\nconst WAIT_NOTIFICATION = \"wait for second player notification\";\nconst START_THE_GAME_NOTIFICATION = \"\";\nconst DISCONNECTION_NOTIFICATION = 'disconnection notifications';\nconst NOTIFICATION = 'notification';\nconst PLAYER_ACTION = 'player moves'\nconst CONNECTION_REFUSED = 'the connection is refused notifications';\nconst CONTROLLED_PADDLE = 'the paddle that a player control';\nconst OPPONENT_ACTION = 'the opponent moved';\nconst BALL_ACTION = 'the ball moved';\nconst CHAT_MESSAGE = 'chat message';\nconst CENTRALISE_PADDLE = 'centralise the paddle notification';\nconst TIMER = 'the time left before the game starts';\n\nconst BYE = \"bye notification\";\n\n//# sourceURL=webpack://client/../server/scripts/message.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/pong.js");
/******/ 	
/******/ })()
;