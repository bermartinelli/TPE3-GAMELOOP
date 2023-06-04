

let StartGame = document.getElementById('start');
let MainMenu = document.querySelector(".start-menu");
let InstructionsMenu = document.querySelector(".instructions-menu");
let container = document.querySelector(".game-container");
let botonReiniciar = document.querySelector(".reiniciar-button");
let botonJugar = document.querySelectorAll(".startGame");
let gameOverMenu =  document.getElementById('menu-game-over');
let divOcultar = document.getElementById("ocultar");
let playerQuieto = document.getElementById("playerQuieto");
let puntajeFinal = document.getElementById("puntaje");

let instrucciones = document.getElementById("instrucciones");
let startButtons = document.getElementById("start-buttons");
let scoreButtons = document.getElementById("scores");
let botonInstrucciones = document.getElementById("instructions");

let divZombie = document.getElementById("player");

let zombie = new Zombie();
let enemy =null;
let enemy2= null;
let prizeLeg = null;

let enemies = [];
let enemies2 = [];
let prizes=[];

let huboChoqueEnemigo = false;
let huboChoquePrize = false;

let score = null;
let timer = null;
let vidas = 5;


let enemyFlag = false;
let PrizeFlag = false;

let in_game = false;
let game_over = false;
let gameManager = null;

let intervaloNewEnemy;
let intervaloEnemigo;
let periodoEnemigo = 8 * 1000;
let periodoPrize = 9 * 1000;

let tiempoEnemigosA = 2 *1000; //2 segundos
let tiempoEnemigosB= 5 *1000;  // 5 segundos

lifeSound = new Audio('sounds/vida.wav');
introSound = new Audio('sounds/intro.wav');
buttonSound = new Audio('sounds/mixkit-player-select-notification-2037.mp3');






function runGame() {

    score = 0;
    timer = 60;
    vidas = 5;

    instrucciones.classList.add('hide');
    startButtons.classList.add('hide');
    playerQuieto.classList.add('hide');
    scoreButtons.classList.remove('hide');
    divOcultar.classList.remove('hide');
    zombie.run();
    introSound.pause();

    intervaloNewEnemy = setInterval(() => {
        newEnemy();
    }, 5000);

    intervaloNewEnemy = setInterval(() => {
      newEnemy2();
  }, 5000);

    intervaloNewPrize = setInterval(() => {
      newPrize();
  }, getBetween(9000 , 12000));


    intervaloSegundos = setInterval(() => {
      if(timer != 0) {
      timer--;
      score = score + 100;
    }
  }, 1000);

    huboChoque = false;

    in_game = true;
    gameManager = new GameManager();
    gameLoop();


}



function gameLoop() {
    gameManager.process_user_input(zombie); //permitir saltar


    refresh_status(); //actualiza el estado del juego
    //rendering();



    if (in_game) {
      requestAnimationFrame(gameLoop);
    } else if (!in_game) {
      zombie.ko();
      setTimeout(() => {
        endGame();
      }, 5000);
    }

  
    document.getElementById('timer').innerText = `Tiempo: ${Math.floor(timer)}`;
    document.getElementById('score').innerText = `Puntos: ${score}`;

    if(vidas>=1) {
    document.getElementById('nroVidas').innerText = `      ${vidas}`;
    } else{
    document.getElementById('nroVidas').innerText = ` CERO `;
    }
  }


  function refresh_status() {

    chequearChoquesEnemigos();

    chequearTimer();

    chequearChoquesPrizes();
    
  }

  function chequearChoquesPrizes(){

    if(prizeLeg) {
      let choquePrize1 = prizeLeg.checkCollision(zombie);
  
      if(choquePrize1) {
        PrizeFlag =true;
        divOcultar.removeChild(prizeLeg.getPrizeBody());
      } else {
        PrizeFlag = false;
        huboChoquePrize = false;
      }
      }

    if(PrizeFlag) {

      if(!huboChoquePrize) {
        score = score + 500;
        vidas++;
        lifeSound.play();
        huboChoquePrize = true;
        
      }
    }


  }

  function chequearTimer(){
    if(timer==0) {
        endGame();
    }

  }

  function chequearChoquesEnemigos(){
     
    if(enemy || enemy2) {
        let choque1 = enemy.checkCollision(zombie);
        let choque2 = enemy2.checkCollision(zombie);
        
        if(choque1 || choque2) {
          enemyFlag = true;
        } else {
          enemyFlag = false;
          huboChoqueEnemigo = false;
        }
      
      }
    
    if(enemyFlag) {

      if(!huboChoqueEnemigo) {
        perderVida();
        huboChoqueEnemigo=true;
      }
    }

  
  }

  function perderVida() {

      zombie.herido();
      if(vidas == 1) {
        in_game = false;
        score = score - 300;
        vidas--
      } else {
        score = score - 300;
        vidas--
      }
  }

function limpiarContainer(){
    let divEnemy = document.querySelector(".enemy");
    let divEnemy2 = document.querySelector(".enemy2");

  if(enemy || enemy2) {
   divEnemy.style.display = 'none';
   divEnemy2.style.display = 'none';
  }
}

function endGame() {
   
  scoreButtons.classList.add('hide');
  divOcultar.classList.add('hide');
  introSound.load();
  introSound.play();
  limpiarContainer();
  clearInterval(intervaloNewEnemy);

  let puntos = score + vidas*300;
  puntajeFinal.innerHTML =  `      ${puntos}`;

  if(timer==0 && vidas != 0) {
    playerQuieto.classList.remove('hide');
  }

  gameOverMenu.style.display = 'block';

  score = 0;
  timer = 0;
}



function getBetween(a, b) {
  number = a + (b - a) * Math.random(); //agarra numero entre a y b

  return Math.round(number);
}

function newEnemy(){

  timeBetween = getBetween(tiempoEnemigosA,tiempoEnemigosB);
  
  clearInterval(intervaloEnemigo)
  intervaloEnemigo = setInterval(() => {
    newEnemy();
}, timeBetween);
  

enemy = new Enemy();
enemies.push(enemy);

}

function newEnemy2(){

  timeBetween = getBetween(tiempoEnemigosA,tiempoEnemigosB);
  
  clearInterval(intervaloEnemigo)
  intervaloEnemigo = setInterval(() => {
    newEnemy2();
}, timeBetween);
  

enemy2 = new Enemy2();
enemies2.push(enemy2);

}

function newPrize(){

prizeLeg = new prizeBody();
prizes.push(prizeLeg);
}

botonInstrucciones.addEventListener('click', () =>{

    buttonSound.play();
    startButtons.classList.add('hide');
    instrucciones.classList.remove('hide');

  })

  for (let boton of botonJugar) {
    boton.addEventListener('click', () =>{
      buttonSound.play();
      gameOverMenu.style.display = 'none';
      divZombie.style.display = 'inline';
      runGame();
    })
  }



botonReiniciar.addEventListener('click', () =>{
    
  buttonSound.play();
  gameOverMenu.style.display = 'none';
  divOcultar.classList.remove('hide');

  clearInterval(intervaloNewEnemy);
  clearInterval(intervaloEnemigo);
  
  enemies.forEach(enemy => {
    divOcultar.removeChild(enemy.getEnemy());
  });
  
  enemies2.forEach(enemy2 => {
    divOcultar.removeChild(enemy2.getEnemy2());
  });

  enemies = [];
  enemies2 = [];

  runGame();
})


