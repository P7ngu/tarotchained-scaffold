//handles the entire game logic and physics 
import { kill } from "process";
import initKaplay from "~~/app/kaplayContext.js";
import { store, textBoxContentAtom, isTextBoxVisibleAtom } from "~~/app/store/store.js";


export default function initGame() {
    const k = initKaplay();
    const DIAGONAL_FACTOR = 1/ Math.sqrt(2);

    if (!document.getElementById("overlayStyles")) {
  const style = document.createElement("style");
  style.id = "overlayStyles";
  style.textContent = `
    body { background-color: #f7f7f7; }

    #htmlOverlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.7);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }

    .black-box {
      width: 400px;
      height: 300px;
      background-color: black;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      color: white;
      font-size: 24px;
      font-family: sans-serif;
      position: relative;
    }

    #closeOverlay {
      align-self: flex-start;
      background-color: #d2b48c; /* Marrone chiaro (tan) */
      border: 2px solid #8b5c2c; /* Marrone più scuro */
      color: #4a2c12;
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 6px;
    }
  `;
  document.head.appendChild(style);
}

if (!document.getElementById("startShuffle")) {
  // Start button
  const btn = document.createElement("button");
  btn.id = "showInventory";
  btn.textContent = "Show Inventory";
  Object.assign(btn.style, {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    zIndex: "1000",
    fontSize: "16px",
    cursor: "pointer",
  });
  document.body.appendChild(btn);

  // Overlay with single black box
  const overlay = document.createElement("div");
  overlay.id = "htmlOverlay";
  overlay.innerHTML = `
    <div class="black-box">
      <div>Inventory content here</div>
      <button id="closeOverlay">Close</button>
    </div>
  `;
  document.body.appendChild(overlay);

  // Show overlay
  btn.addEventListener("click", () => {
    overlay.style.display = "flex";
  });

  // Hide overlay
  overlay.querySelector("#closeOverlay")
         .addEventListener("click", () => {
    overlay.style.display = "none";
  });
}


    
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

    shop.onCollide("player", (player) => {
        console.log("player entered shop");
        store.set(isTextBoxVisibleAtom, true);  
        store.set(textBoxContentAtom, "Benvenuto nella mia bottega!");
        
    });

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


}
