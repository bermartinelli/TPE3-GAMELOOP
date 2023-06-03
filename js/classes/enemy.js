class Enemy extends GameObject{
    
    constructor(velocidad) {
        super();
        this.enemy = document.createElement("div");
        this.enemy.setAttribute("class", "enemy");
        this.enemy.classList.add("enemy");
        this.muerto = false;
        this.velocidad = velocidad;
        
        this.enemy.style.animation = `enemy 5s forwards linear`;
        document.querySelector("#ocultar").appendChild(this.enemy);
    }

    //, enemy-run 1s steps(6) infinite

    getEnemy(){
        return this.enemy;
    }

    status() {
        return this.enemy.getBoundingClientRect();
    }


    checkCollision(zombie) {
        let zombieStatus = zombie.status();
        let enemyStatus = this.status();
         //la cordenada 0.0 es arriba a la izquerda
        if(zombieStatus.right > enemyStatus.left + 150  && zombieStatus.left < enemyStatus.right - 150 && zombieStatus.bottom > enemyStatus.top + 150 && zombieStatus.top < enemyStatus.bottom){
           

            return true;
       } else{
           return false;
      }
    }
}