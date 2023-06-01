class Enemy2 extends GameObject{
    
    constructor(velocidad) {
        super();
        this.enemy2 = document.createElement("div");
        this.enemy2.setAttribute("class", "enemy2");
        this.enemy2.classList.add("enemy2");
        this.muerto = false;
        this.velocidad = velocidad;
        
        this.enemy2.style.animation = `enemy 10s forwards linear`;
        document.querySelector("#ocultar").appendChild(this.enemy2);
        
    }

    

    status() {
        return this.enemy2.getBoundingClientRect();
    }
}