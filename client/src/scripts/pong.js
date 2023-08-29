'use strict';

import Game from './Game.js';

const init = () => {
  const theField = document.getElementById("field");
  const theGame = new Game(theField);

  document.getElementById('start').addEventListener("click", () => startGame(theGame) );
  window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));
  window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
  document.getElementById("send_msg").addEventListener('click', () => theGame.sendMsg());
}

window.addEventListener("load",init);

// true iff game is started
let started = false;
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 */
const startGame = theGame => {
  if (!started) {
    theGame.initSocket();
    document.getElementById('start').value = 'disconnect';
  }
  else {
    document.getElementById('start').value = 'connect';
    theGame.disconnectSocket();
  }
  started = ! started;
}