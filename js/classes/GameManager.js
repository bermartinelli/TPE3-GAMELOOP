class GameManager {

    constructor() {
        this.zombie = new Zombie();
        this.enemy  = new Enemy();
        this.enemy2 = new Enemy2();
    }

    getEnemy() {
        return this.enemy;
    }

    actionZombie(e){
        console.log("hola");
    switch (e.code) {
        case "Space":
          this.zombie.jump();
          console.log("hola");
          break;
      }
    }

      checkCollision() {
        let zombieStatus = this.zombie.status();
        let enemyStatus = this.enemy.status();
        let enemy2Status = this.enemy2.status();
        
    
        if(!(zombieStatus.right - 100 < enemyStatus.left || zombieStatus.left-200> enemyStatus.right || zombieStatus.bottom-200< enemyStatus.top || zombieStatus.top -100 > enemyStatus.bottom)){
            console.log("power");
            return true;
        }else if(!(zombieStatus.right < enemy2Status.left || zombieStatus.left  > enemy2Status.right|| zombieStatus.bottom < enemy2Status.top || zombieStatus.top - 100  > enemy2Status.bottom)){
            console.log("cyber");
            return true;
        }else{
          return false; 
        }
      }


    process_user_input() {
        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "Space":
                  this.zombie.jump();
                  break;
              }
          });
    }



}