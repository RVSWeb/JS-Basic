/* 
 Created on : 27 abr. 2020, 18:07:33
 Author     : Android
 */


// Es 'trigger' cuando el documento HTML ha sido completamente 
// cargado y parseado, sin esperar hojas de estilo,
// images y subframes para  finalizar la carga
document.addEventListener('DOMContentLoaded', () => {
// Array de elementos 'div' de toda la pantalla de juego
  const squares = document.querySelectorAll('.grid div');
//  Panel de 'Score'
  const resultDisplay = document.querySelector('#result');
//  Anchura del tablero de juego
  let width = 15;
// Posicion de la nave en el array
  let currentShooterIndex = 202;
// Posicion del 1º elemento del array de las naves
  let currentInvaderIndex = 0;
// Array del disparo
  let alienInvadersTakenDown = [];
// 'Score' del juego
  let result = 0;
// Define el movimiento de izq a der de las naves 
// 1 - define el movimiento zis zas
// 2 - define movimiento continuo
  let direction = 1;
//  Define la nave enemiga
  let invaderId;
  //  Define la cantidad de Aliens Invaders alineadas con el indice del array
  const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
  ];

//  Draw the alien invaders
  alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'));

//  Draw the shooter
// Propiedad : classList Method : add - Añado una clase                              
  squares[currentShooterIndex].classList.add('shooter');

  /**
   * Move the shooter 'NAVE' along a line 
   * 
   * @param {type} e
   * @returns {undefined}
   */
  function moveShooter(e) {
// Quitamos todas las naves de la pantalla 'board = tablero'
    squares[currentShooterIndex].classList.remove('shooter');
// Movimiento de la nave hacia izq.
    switch (e.keyCode) {
      case 37:
        if (currentShooterIndex % width !== 0) {
          currentShooterIndex -= 1;
        }
        break;
// Movimiento de la nave hacia der.
      case 39:
        if (currentShooterIndex % width < width - 1) {
          currentShooterIndex += 1;
        }
        break;
    }
//
    squares[currentShooterIndex].classList.add('shooter');
  }

  document.addEventListener('keydown', moveShooter);

  /**
   * Move the Alien Invaders
   * 
   * @returns {undefined}
   */
  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
      direction = width;
    } else if (direction === width) {
      if (leftEdge) {
        direction = 1;
      } else {
        direction = -1;
      }
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      squares[alienInvaders[i]].classList.remove('invader');
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      alienInvaders[i] += direction;
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      if (!alienInvadersTakenDown.includes(i)) {
        squares[alienInvaders[i]].classList.add('invader');
      }
    }

//      Decide a game over
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
      resultDisplay.textContent = 'Game Over';
      squares[currentShooterIndex].classList.add('boom');
      clearInterval(invaderId);
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      if (alienInvaders[i] > (squares.length - (width - 1))) {
        resultDisplay.textContent = 'Game Over';
        clearInterval(invaderId);
      }
    }

//   Decide a win
    if (alienInvadersTakenDown.length === alienInvaders.length) {
      resultDisplay.textContent = 'You Win';
      clearInterval(invaderId);
    }
  }

//  Movimiento de los enemigos que bajan
  invaderId = setInterval(moveInvaders, 500);

  /**
   * Shoot at aliens 
   * 
   * @param {type} e
   * @returns nothing
   */
  function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    /**
     * Move the laser from the shooter to the Aliens Invader
     * 
     * @returns nothing
     */
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser');
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add('laser');
      if (squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser');
        squares[currentLaserIndex].classList.remove('invader');
        squares[currentLaserIndex].classList.add('boom');

// Crea la explosión del enemigo al golpear el disparo con el
        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
        clearInterval(laserId);

        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
        alienInvadersTakenDown.push(alienTakenDown);
        result++;
        resultDisplay.textContent = result;
      }

      if (currentLaserIndex < width) {
        clearInterval(laserId);
        setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
      }
    }

// Crea disparos en bloque a la vez
//    document.addEventListener('keyup', e => {
//      if (e.keyCode === 32) {
//        laserId = setInterval(moveLaser, 100);
//      }
//    });

// Dispara el laser estilo ametralladora
    switch (e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100);
        break;
    }
  }

  document.addEventListener('keyup', shoot);

});


