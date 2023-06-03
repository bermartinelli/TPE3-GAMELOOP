class Enemy2 extends GameObject{
    
    constructor(velocidad) {
        super();
        this.enemy2 = document.createElement("div");
        this.enemy2.setAttribute("class", "enemy2");
        this.enemy2.classList.add("enemy2");
        this.muerto = false;
        this.velocidad = velocidad;
        
        this.enemy2.style.animation = `enemy 2s forwards linear`;
        document.querySelector("#ocultar").appendChild(this.enemy2);
        
    }

    getEnemy2(){
        return this.enemy2;
    }

    status() {
        return this.enemy2.getBoundingClientRect();
    }

    checkCollision(zombie) {
        let zombieStatus = zombie.status();
        let enemyStatus = this.status();

        if(zombieStatus.right > enemyStatus.left + 100  && zombieStatus.left < enemyStatus.right - 100 && zombieStatus.bottom > enemyStatus.top + 100  && zombieStatus.top < enemyStatus.bottom){
           

            return true;
       } else{
           return false;
      }
    }

   
}