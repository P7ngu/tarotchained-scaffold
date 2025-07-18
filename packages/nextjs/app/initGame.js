//handles the entire game logic and physics 
import { kill } from "process";
import initKaplay from "~~/app/kaplayContext.js";
import { store, textBoxContentAtom, isTextBoxVisibleAtom } from "~~/app/store/store.js";


export default function initGame() {
    const k = initKaplay();
    const DIAGONAL_FACTOR = 1/ Math.sqrt(2);

    k.loadSprite("tarotDesk", "./tarotDesk.png");
    k.loadSprite("background", "./background.png");
    k.loadSprite("blackShop", "./blackShop.png");
    k.loadSprite("butcher", "./butcher.png");
    k.loadSprite("campfire", "./campfire.png");
    k.loadSprite("orangeShop", "./orangeShop.png");
    k.loadSprite("well", "./well.png");
    k.loadSprite("terrain", "./terrain.png");
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

    const background = k.add([
        k.sprite("background"), 
        k.pos(k.center()), 
        k.scale(1), 
        k.anchor("center"), 
        "background"]);

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
        k.pos(1350, 430),
        k.anchor("center"),
        k.scale(0.32),
        k.area(),
        k.body({ isStatic: true }), 
        "shop",
    ]);

     const blackShop = k.add([
        k.sprite("blackShop"),
        k.pos(2300, 380),
        k.anchor("center"),
        k.scale(0.28),
        k.area(),
        k.body({ isStatic: true }), 
        "blackShop",
    ]);

      const orangeShop = k.add([
        k.sprite("orangeShop"),
        k.pos(500, 1180),
        k.anchor("center"),
        k.scale(0.25),
        k.area(),
        k.body({ isStatic: true }), 
        "orangeShop",
    ]);

     const butcher = k.add([
        k.sprite("butcher"),
        k.pos(760, 410),
        k.anchor("center"),
        k.scale(0.25),
        k.area(),
        k.body({ isStatic: true }), 
        "butcher",
    ]);

      const campfire = k.add([
        k.sprite("campfire"),
        k.pos(360, 560),
        k.anchor("center"),
        k.scale(0.23),
        k.area(),
        k.body({ isStatic: true }), 
        "campfire",
    ]);

    const well = k.add([
        k.sprite("well"),
        k.pos(1800, 900),
        k.anchor("center"),
        k.scale(0.25),
        k.area(),
        k.body({ isStatic: true }), 
        "well",
    ]);

    const terrain = k.add([
        k.sprite("terrain"),
        k.pos(2050, 1100),
        k.anchor("center"),
        k.scale(0.22),
        k.area(),
        k.body({ isStatic: true }), 
        "terrain",
    ]);

player.onUpdate(() => {
player.direction.x = 0; 
player.direction.y = 0;

if (k.isKeyDown("left")) player.direction.x = -1;
if (k.isKeyDown("right")) player.direction.x = 1;
if (k.isKeyDown("up")) player.direction.y = -1; 
if (k.isKeyDown("down")) player.direction.y = 1;


if ( player.direction.eq(k.vec2(-1,0)) && player.getCurAnim().name !== "left"
) { player.play("left"); }

if (  player.direction.eq(k.vec2(1, 0)) && player.getCurAnim().name !== "right") {
    player.play("right");
}

if ( player.direction.eq(k.vec2(0, -1)) && player.getCurAnim().name !== "up") { 
    player.play("up");
}

if ( player.direction.eq(k.vec2(0, 1)) && player.getCurAnim().name !== "down") {
    player.play("down");
}

if (player.direction.eq(k.vec2(0, 0)) && !player.getCurAnim().name.includes("idle")) {
    player.play(`${player.getCurAnim().name}-idle`);
    
}

if (player.direction.x && player.direction.y) {
    player.move(player.direction.scale(DIAGONAL_FACTOR * player.speed));
    return;
}
player.move(player.direction.scale(player.speed));

const screenWidth = k.width();
const screenHeight = k.height();
const margin = 50;
const topMargin = screenHeight / 3.5; 


const left = margin;
const right = screenWidth - margin;
const top = topMargin;
const bottom = screenHeight - margin;

if (player.pos.x < left) player.pos.x = left;
if (player.pos.x > right) player.pos.x = right;
if (player.pos.y < top) player.pos.y = top;
if (player.pos.y > bottom) player.pos.y = bottom;


});

k.loadSprite("button", "./collectionButton.png");
const cButton = k.add([
    k.sprite("button"),
    k.pos(k.width() - 300, 150), 
    k.anchor("center"),
    "button",
  ]);
  window.addEventListener("keydown", handleKeyPress);

  function handleKeyPress(e) {
    if (e.code === "KeyI") { 
      console.log("I key pressed!");
      openCollectionPage(); 
    }
  }
  
  function openCollectionPage() {
    window.open("/contractTest", "_blank");  
  }

k.loadSprite("text6", "./text1.png");
k.loadSprite("text7", "./text7.png");
k.loadSprite("cards1", "./cards2.png");

let text = null;
let cards = null;
shop.onCollide("player", (player) => {
  let step = 0;

  text = k.add([
      k.sprite("text6"),
      k.pos(k.center().x, k.center().y + 450), 
      k.anchor("center"),
      "text6",
  ]);
  window.addEventListener("keydown", handleKeyPress);

  function handleKeyPress(e) {
      if (e.code === "Enter") {
          if (step == 0){

            cards = k.add([
              k.sprite("cards1"),
              k.pos(k.center().x, k.center().y), 
              k.anchor("center"),
              "cards1",
          ]);
              text = k.add([
                  k.sprite("text7"),
                  k.pos(k.center().x, k.center().y + 450), 
                  k.anchor("center"),
                  "text7",
              ]);
              step++;
          }else if (step == 1){
            window.open("/getRandomCard", "_blank");  
          }else{
              return;
          }
      }
  }
});
}

