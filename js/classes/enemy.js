class Enemy extends GameObject{
    
    constructor(velocidad) {
        super();
        this.enemy = document.createElement("div");
        this.enemy.setAttribute("class", "enemy");
        this.enemy.classList.add("enemy");
        this.muerto = false;
        this.velocidad = velocidad;
        
        this.enemy.style.animation = `enemy 2.5s forwards linear`;
        document.querySelector("#ocultar").appendChild(this.enemy);
    }

    //, enemy-run 1s steps(6) infinite

    getEnemy(){
        return this.enemy;
    }

    status() {
        return this.enemy.getBoundingClientRect();
    }
}