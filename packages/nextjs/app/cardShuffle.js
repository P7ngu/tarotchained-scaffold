import initKaplay from "~~/app/kaplayContext.js";
import { isTextBoxVisibleAtom, store, textBoxContentAtom } from "~~/app/store/store.js";

/**
 * Shuffle a three-card deck and animate the swapping of cards.
 * Uses Kaplay for sprite management and tweening.
 */
export default async function cardShuffle() {
  const k = initKaplay();

  await k.loadSprite("cardBack0", "/cardBack.png");
  await k.loadSprite("cardBack1", "/cardBack.png");
  await k.loadSprite("cardBack2", "/cardBack.png");

  
for (let i = 0; i < 3; i++) {
  const cardBack = k.add([
    k.sprite("cardBack" + i),
    k.pos(600 + 350 * i, 450),
    k.anchor("center"),
    k.scale(0.5),
    k.area(),
    k.body({ isStatic: true }), 
    "cardBack" + i.toString(),
]);
}

   // === Animation block starts here ===

  // 1. Grab each card by its tag
  const cards = [
    k.get("cardBack0")[0],
    k.get("cardBack1")[0],
    k.get("cardBack2")[0],
  ];

  // 2. Hop each card up and down
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const start = card.pos;                    // this is a Vec2
    const upPos = k.vec2(start.x, 400);       // build another Vec2

    // tween from start → upPos over 0.3s, reassigning to card.pos each frame
    k.tween(start, upPos, 0.3, (v) => {
      card.pos = v;
    });                                       
    await k.wait(350);

    const downPos = k.vec2(start.x, 450);
    k.tween(card.pos, downPos, 0.3, (v) => {
      card.pos = v;
    });
    await k.wait(350);
  }

  // 3. Simple swap‐shuffle of their x’s
  const positions = [600, 950, 1300];
  for (let n = 0; n < 4; n++) {
    let a = Math.floor(Math.random() * 3);
    let b;
    do { b = Math.floor(Math.random() * 3); } while (b === a);

    const cardA = cards[a];
    const cardB = cards[b];

    const posA = cardA.pos;
    const posB = cardB.pos;
    const targetA = k.vec2(positions[b], posA.y);
    const targetB = k.vec2(positions[a], posB.y);

    k.tween(posA, targetA, 0.3, (v) => {
      cardA.pos = v;
    });
    k.tween(posB, targetB, 0.3, (v) => {
      cardB.pos = v;
    });
    await k.wait(350);

    // swap in our local array so future swaps know who’s where
    [cards[a], cards[b]] = [cards[b], cards[a]];
  }
  // === Animation block ends here ===
}