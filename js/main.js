

let StartGame = document.getElementById('start');
let MainMenu = document.querySelector(".start-menu");
let InstructionsMenu = document.querySelector(".instructions-menu");
let container = document.querySelector(".game-container");
let botonReiniciar = document.querySelector(".reiniciar-button");
let botonJugar = document.getElementById("start");
let gameOverMenu =  document.getElementById('menu-game-over');
let divOcultar = document.getElementById("ocultar");

let instrucciones = document.getElementById("instrucciones");
let startButtons = document.getElementById("start-buttons");
let scoreButtons = document.getElementById("scores");
botonInstrucciones = document.getElementById("instructions");

let divZombie = document.getElementById("player");


let score = 0;
let timer = 0;


let in_game = false;
let game_over = false;
let gameManager = null;

let intervaloEnemigo;
let periodoEnemigo = 4000;

let enemy =null;
let enemy2= null;


let colisionEnemy = false;




function runGame() {

    score = 0;
    timer = 0;

    instrucciones.classList.add('hide');
    startButtons.classList.add('hide');
    scoreButtons.classList.remove('hide');
    divOcultar.classList.remove('hide');

    intervaloEnemigo = setInterval(() => {
        newEnemy();
    }, periodoEnemigo);

    in_game = true;
    gameManager = new GameManager();
    gameLoop();


}



function gameLoop() {
    gameManager.process_user_input();
    refresh_status();
    //rendering();
  
    if (in_game) {
      requestAnimationFrame(gameLoop);
    }

    timer = 0.00;
    document.getElementById('timer').innerText = `Tiempo: ${Math.floor(timer)}`;
    score += 1;
    document.getElementById('score').innerText = `Puntos: ${score}`;
  }

  function refresh_status() {
    huboChoque = gameManager.checkCollision();

    if(huboChoque) {
        endGame();
    }
  }


function limpiarContainer(){//limpia todos los elementos del gameContainer para que los elementos viejos no interfieran con los nuevos si se llega a instanciar el juego
    let divEnemy = document.querySelector(".enemy");
    let divEnemy2 = document.querySelector(".enemy2");


   divEnemy.style.display = 'none';
   divEnemy2.style.display = 'none';

}
function endGame() {
   
    scoreButtons.classList.add('hide');
    divOcultar.classList.add('hide');
    limpiarContainer();
    clearInterval(intervaloEnemigo);
    //clearInterval(spawnInterval);

    gameOverMenu.style.display = 'block';
}

function newEnemy(){
    gameManager = new GameManager();
}


botonInstrucciones.addEventListener('click', () =>{
    instrucciones.classList.remove('hide');
  })


botonJugar.addEventListener('click', () =>{
    gameOverMenu.style.display = 'none';
    divZombie.style.display = 'inline';
    runGame();
  })

botonReiniciar.addEventListener('click', () =>{
    
    gameOverMenu.style.display = 'none';
    divOcultar.classList.remove('hide');
    runGame();
  })


