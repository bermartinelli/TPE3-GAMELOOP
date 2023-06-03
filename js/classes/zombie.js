class Zombie extends GameObject{

    constructor() {
        super();
        this.player = document.getElementById("player");
    }

    clean() {
        this.player.classList.remove("run");
        this.player.classList.remove("jump");
        this.player.classList.remove("fall");
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
            console.log("hola");
            this.player.addEventListener("animationend", () => {
                this.fall();
            });
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