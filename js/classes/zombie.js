class Zombie extends GameObject{

    constructor() {
        super();
        this.player = document.getElementById("player");
        this.jumpSound = new Audio('sounds/jump.wav');
        this.hitSound = new Audio('sounds/hit.wav');
        this.deadSound = new Audio('sounds/game-over.wav');
        
    }

    

    clean() {
        this.player.classList.remove("run");
        this.player.classList.remove("jump");
        this.player.classList.remove("fall");
        this.player.classList.remove("herido");
        this.player.classList.remove("quieto");
        this.player.classList.remove("ko");
        this.player.classList.remove("dead");
        this.player.removeEventListener("animationend", () => { });
    }

    
    run() {
        this.clean();
        this.player.classList.add("run");
    }

    jump() {
        if (this.player.classList.contains("run")) {
            this.clean();
            this.player.classList.add("jump");
            this.jumpSound.play();
            this.player.addEventListener("animationend", () => {
                this.fall();
            });
        }
    }

    herido(){
            this.clean();
            this.player.classList.add("herido");
            this.hitSound.play();
                setTimeout(() => {
                    this.run();
                }, 300);
        
    }

    quieto(){
        this.clean();
        this.player.classList.add("quieto");
    }

    ko(){
        this.clean();
            this.player.classList.add("herido");
                setTimeout(() => {
                    this.clean();
                    this.player.classList.add("ko");
                    this.deadSound.play();
                    setTimeout(() => {
                        this.dead();
                    }, 500);
                }, 300);
        
    }

    dead(){
        if (this.player.classList.contains("ko")) {
            this.clean();
            this.player.classList.add("dead");
        }
    }

    fall() {
        this.clean();
        this.player.classList.add("fall");
        this.player.addEventListener("animationend", () => {
            this.run();
        });
    }

    status() {
        return this.player.getBoundingClientRect();
    }
}