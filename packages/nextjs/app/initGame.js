//handles the entire game logic and physics 
import initKaplay from "~~/app/kaplayContext.js";
import { store, textBoxContentAtom, isTextBoxVisibleAtom } from "~~/app/store/store.js";


export default function initGame() {
    const k = initKaplay();
    const DIAGONAL_FACTOR = 1/ Math.sqrt(2);

    k.loadSprite("tarotDesk", "./tarotDesk.png");
    k.loadSprite("background", "./background.png");
    //TODO: change the character
    k.loadSprite("characters", "./characters.png",{
        sliceY: 2, 
        sliceX: 8, 
        anims: {
            "down-idle": 0,
            "up-idle": 1,
            "right-idle": 2,
            "left-idle": 3,
            right: {from: 4, to: 5, loop: true}, 
            left: { from: 6, to: 7, loop: true},
            down: { from: 8, to: 9, loop: true},
            up: { from: 10, to: 11, loop: true},
        },
    });

    k.add([k.sprite("background"), k.pos(0, 0), k.scale(0.75)]);


    const player = k.add([
        k.sprite("characters", {anim: "down-idle"}),
        k.area(),
        k.body(), 
        k.anchor("center"),
        k.scale(8), 
        k.pos(k.center()),
        "player", 
        {
            speed: 800, 
            direction: k.vec2(0,0), 
        },
]);


    const shop = k.add([
        k.sprite("tarotDesk"),
        k.pos(600, 450),
        k.anchor("center"),
        k.scale(0.2),
        k.area(),
        k.body({ isStatic: true }), 
        "shop",
    ]);

    shop.onCollide("player", (player) => {
        console.log("player entered shop");
        store.set(textBoxContentAtom, "Benvenuto nella mia bottega!");
        
    });


player.onUpdate(() => {
player.direction.x = 0; 
player.direction.y = 0;



//passi come stringa come parametro il tasto
if (k.isKeyDown("left")) player.direction.x = -1;
if (k.isKeyDown("right")) player.direction.x = 1;
if (k.isKeyDown("up")) player.direction.y = -1; 
if (k.isKeyDown("down")) player.direction.y = 1;


if ( 
    player.direction.eq(k.vec2(-1,0)) &&
    player.getCurAnim().name !== "left"
) {
    player.play("left");
}

if ( 
    player.direction.eq(k.vec2(1, 0)) &&
    player.getCurAnim().name !== "right"
) {
    player.play("right");
}

if ( 
    player.direction.eq(k.vec2(0, -1)) &&
    player.getCurAnim().name !== "up"
) {
    player.play("up");
}

if ( 
    player.direction.eq(k.vec2(0, 1)) &&
    player.getCurAnim().name !== "down"
) {
    player.play("down");
}

if (
    player.direction.eq(k.vec2(0, 0)) &&
    !player.getCurAnim().name.includes("idle")
) {
    player.play(`${player.getCurAnim().name}-idle`);
    
}

if (player.direction.x && player.direction.y) {
    player.move(player.direction.scale(DIAGONAL_FACTOR * player.speed));
    return;
}
player.move(player.direction.scale(player.speed));
});

 
store.set(isTextBoxVisibleAtom, true);  


}
