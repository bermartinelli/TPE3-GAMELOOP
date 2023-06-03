class GameManager {

    constructor() {
    }


    process_user_input(zombie) {
        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "Space":
                  zombie.jump();
                  break;
              }
          });
    }



}