import initKaplay from "~~/app/kaplayContext.js";
import { isTextBoxVisibleAtom, store, textBoxContentAtom } from "~~/app/store/store.js";

/**
 * Shuffle a three-card deck and animate the swapping of cards.
 * Uses Kaplay for sprite management and tweening.
 */
export default async function cardShuffle() {
  const k = initKaplay();

  // === Button setup: create once per page load ===
  if (typeof document !== 'undefined' && !document.getElementById('restartShuffle')) {
    const btn = document.createElement('button');
    btn.id = 'restartShuffle';
    btn.textContent = 'Restart Shuffle';
    // ensure it's on top of any canvas
    Object.assign(btn.style, {
      position: 'absolute',
      top: '20px',
      right: '20px',
      padding: '10px 20px',
      zIndex: '1000',
      fontSize: '16px',
      cursor: 'pointer',
    });
    document.body.appendChild(btn);
    btn.addEventListener('click', () => {
      // simply restart the shuffle
      cardShuffle();
    });
  }

  // Optionally clear existing sprites if Kaplay supports it
  // if (k.clear) k.clear();

  // Load back textures
  await k.loadSprite("cardBack0", "/cardBack.png");
  await k.loadSprite("cardBack1", "/cardBack.png");
  await k.loadSprite("cardBack2", "/cardBack.png");

  // Create card entities (reset positions)
  for (let i = 0; i < 3; i++) {
    k.add([
      k.sprite("cardBack" + i),
      k.pos(600 + 350 * i, 450),
      k.anchor("center"),
      k.scale(0.5),
      k.area(),
      k.body({ isStatic: true }),
      "cardBack" + i
    ]);
  }

  // Animation block
  const cards = [
    k.get("cardBack0")[0],
    k.get("cardBack1")[0],
    k.get("cardBack2")[0]
  ];
  const homeX = [600, 950, 1300];

  // Hop up/down
  for (let i = 0; i < cards.length; i++) {
    await animateHop(k, cards[i], homeX[i]);
  }

  // Shuffle swaps
  for (let n = 0; n < 4; n++) {
    let a = Math.floor(Math.random() * 3);
    let b;
    do { b = Math.floor(Math.random() * 3); } while (b === a);

    await animateSwap(k, cards[a], cards[b], homeX[b], homeX[a]);
    [cards[a], cards[b]] = [cards[b], cards[a]];
    [homeX[a], homeX[b]] = [homeX[b], homeX[a]];
  }
}

// Helper: hop animation
async function animateHop(k, card, x) {
  k.tween(card.pos, k.vec2(x, 400), 0.3, (v) => { card.pos = v; });
  await k.wait(350);
  k.tween(card.pos, k.vec2(x, 450), 0.3, (v) => { card.pos = v; });
  await k.wait(350);
}

// Helper: swap two cards on X-axis
async function animateSwap(k, cardA, cardB, targetAX, targetBX) {
  k.tween(cardA.pos, k.vec2(targetAX, 450), 0.3, (v) => { cardA.pos = v; });
  k.tween(cardB.pos, k.vec2(targetBX, 450), 0.3, (v) => { cardB.pos = v; });
  await k.wait(350);
}