import initKaplay from "~~/app/kaplayContext.js";
import { isTextBoxVisibleAtom, store, textBoxContentAtom} from "~~/app/store/store.js";
import initGame from "~~/app/initGame.js";

export default function initPrologue() {
    const k = initKaplay();
    const diagonalFactor = 1/Math.sqrt(2);

    if (!document.getElementById("overlayStyles")) {
        const style = document.createElement("style");
        style.id = "overlayStyles";
        style.textContent = `
          body { background-color: #f7f7f7; }
    
          #htmlOverlay {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 1); /* Sfondo nero */
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 1; /* Inizialmente visibile */
            transition: opacity 2s ease-out; /* Animazione di dissolvenza */
          }
    
          .overlayText {
            font-size: 40px;
            font-family: "Lucida Grande", sans-serif;
            color: white; /* Testo bianco */
          }
        `;
        document.head.appendChild(style);
    }

    const overlay = document.createElement("div");
    overlay.id = "htmlOverlay";
    overlay.innerHTML = `<div class="overlayText">Prologue</div>`;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = 0; 
    }, 3000); 
    setTimeout(() => {
        overlay.style.display = "none"; 
    }, 4000); 
    
    function createSecondOverlay() {
        const secondOverlay = document.createElement("div");
        secondOverlay.id = "htmlOverlay";
        secondOverlay.innerHTML = `
            <div class="overlayText">Now build your story</div>
            <div class="overlayButtons">
                <button class="button" id="saveButton">Save in the Wallet</button>
                <button class="button" id="continueButton">Continue</button>
            </div>
        `;
        document.body.appendChild(secondOverlay);

        document.getElementById("saveButton").addEventListener("click", () => {
        });

        document.getElementById("continueButton").addEventListener("click", () => {
            initGame();
            secondOverlay.style.display = "none";
        });
    }

    k.loadSprite("homeBackground", "./homeBackground.png");
    k.loadSprite("characters", "./characters.png", {
        sliceY: 2, sliceX: 8, anims: {
            "down-idle": 0,
            "up-idle": 1,
            "right-idle": 2,
            "left-idle": 3,
            right: {from: 4, to: 5, loop: true},
            left: {from: 6, to: 7, loop: true},
            down: {from: 8, to: 9, loop: true},
            up: {from: 10, to: 11, loop: true},
        },
    });

    const background = k.add([k.sprite("homeBackground"), k.pos(k.center()), k.scale(0.5), k.anchor("center"), "background"]);

    const player = k.add([
        k.sprite("characters", {anim: "down-idle"}), 
        k.pos(k.center()), 
        k.area(), 
        k.body(), 
        k.anchor("center"), 
        k.scale(8), 
        "player",
        {
            speed: 300, 
            direction: k.vec2(0, 0),
        },
    ]);

    player.onUpdate(() => {
        player.direction.x = 0;
        player.direction.y = 0;

        if (k.isKeyDown("left")) player.direction.x = -1;
        if (k.isKeyDown("right")) player.direction.x = 1;
        if (k.isKeyDown("up")) player.direction.y = -1;
        if (k.isKeyDown("down")) player.direction.y = 1;

        if (player.direction.eq(k.vec2(-1,0)) && player.getCurAnim().name !== "left") {
            player.play("left");
        } else if (player.direction.eq(k.vec2(1,0)) && player.getCurAnim().name !== "right") {
            player.play("right");
        } else if (player.direction.eq(k.vec2(0,-1)) && player.getCurAnim().name !== "up") {
            player.play("up");
        } else if (player.direction.eq(k.vec2(0,1)) && player.getCurAnim().name !== "down") {
            player.play("down");
        }
        if (player.direction.eq(k.vec2(0,0))) {
            const cur = player.getCurAnim().name;
            if (!cur.endsWith("-idle")) {
              player.play(`${cur}-idle`);
            }
        }
        player.move(player.direction.scale(player.speed));
        
        if (player.direction.x && player.direction.y){
            player.move(player.direction.scale(diagonalFactor * player.speed));
        } else {
            player.move(player.direction.scale(player.speed));
        }

        const backgroundWidth = background.width * 0.5; 
        const backgroundHeight = background.height * 0.5;  
        const backgroundLeft = k.center().x - backgroundWidth / 2 + 75;
        const backgroundRight = k.center().x + backgroundWidth / 2 - 75;
        const backgroundBottom = k.center().y + backgroundHeight / 2 - 75;

        if (player.pos.x < backgroundLeft) {
            player.pos.x = backgroundLeft;
        } else if (player.pos.x > backgroundRight) {
            player.pos.x = backgroundRight;
        } else if (player.pos.y > backgroundBottom) {
            player.pos.y = backgroundBottom;
        }

    });

    k.loadSprite("bed", "./bed.png");
    k.loadSprite("closet", "./closet.png");
    k.loadSprite("candle", "./candle.png");
    k.loadSprite("chest", "./chest.png");
    k.loadSprite("card", "./foolCard.png");
    k.loadSprite("letter", "./letter.png");


    const bed = k.add([
        k.sprite("bed"), 
        k.pos(1000, 650),
        k.area(), 
        k.body({isStatic: true}), 
        k.anchor("center"), 
        k.scale(0.4), 
    ]);

    const candle = k.add([
        k.sprite("candle"), 
        k.pos(1280, 550),
        k.area(), 
        k.body({isStatic: true}), 
        k.anchor("center"), 
        k.scale(0.4), 
    ]);

    const closet = k.add([
        k.sprite("closet"), 
        k.pos(1580, 550),
        k.area(), 
        k.body({isStatic: true}), 
        k.anchor("center"), 
        k.scale(0.4), 
    ]);

    let chest = null;
    let card = null;
    closet.onCollide("player", (player) => {
        let step = 0;

        store.set(textBoxContentAtom, "Why is my closet open?");
        store.set(isTextBoxVisibleAtom, true);
    
        window.addEventListener("keydown", handleKeyPress);
    
        function handleKeyPress(e) {
            if (e.code === "Enter") {
                if (step == 0){
                    store.set(textBoxContentAtom, "Who put this box in here? I want to check.");
                    step++;
                }else if (step == 1){
                    store.set(isTextBoxVisibleAtom, false);

                    chest = k.add([
                        k.sprite("chest"),
                        k.pos(k.center().x, k.center().y), 
                        k.anchor("center"),
                        k.scale(0.75), 
                        "chest",
                    ]);

                    step++;
                } else if (step == 2){
                    chest.destroy();
                    chest = null;
                    card = k.add([
                        k.sprite("card"),
                        k.pos(k.center().x, k.center().y), 
                        k.anchor("center"),
                        k.scale(4), 
                        "card",
                    ]);
                    store.set(textBoxContentAtom, "what is that supposed to mean?");
                    store.set(isTextBoxVisibleAtom, true);
                    step++;
                } else if (step == 3){
                    card.destroy();
                    card = null;
                    card = k.add([
                        k.sprite("letter"),
                        k.pos(k.center().x, k.center().y), 
                        k.anchor("center"),
                        k.scale(4), 
                        "letter",
                    ]);
                    store.set(textBoxContentAtom, "I have to find them.");
                    store.set(isTextBoxVisibleAtom, true);
                    step++;
                }else {
                    store.set(isTextBoxVisibleAtom, false);
                    createSecondOverlay();
                    return;
                }
            }
        }
    });
}
