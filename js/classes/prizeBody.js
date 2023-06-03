class  prizeBody extends GameObject{
    
    constructor(velocidad) {
        super();
        this.prizeBody = document.createElement("div");
        this.prizeBody.setAttribute("class", "prizeBody");
        this.velocidad = velocidad;
        
        this.prizeBody.style.animation = `enemy 9s forwards linear`;
        document.querySelector("#ocultar").appendChild(this.prizeBody);
    }

    //, enemy-run 1s steps(6) infinite

    getPrizeBody(){
        return this.prizeBody;
    }

    status() {
        return this.prizeBody.getBoundingClientRect();
    }


    checkCollision(zombie) {
        let zombieStatus = zombie.status();
        let prizeBodyStatus = this.status();
         //la cordenada 0.0 es arriba a la izquerda
        if(zombieStatus.right >  prizeBodyStatus.left  && zombieStatus.left < prizeBodyStatus.right && zombieStatus.bottom > prizeBodyStatus.top  && zombieStatus.top < prizeBodyStatus.bottom){
           return true;
       } else{
           return false;
      }
    }
}