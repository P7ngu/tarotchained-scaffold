import initKaplay from "~~/app/kaplayContext.js";
import { isTextBoxVisibleAtom, store, textBoxContentAtom } from "~~/app/store/store.js";


export default async function cardShuffle() {
  // Use a single Kaplay context so animations accumulate
  if (!window._kaplayInstance) {
    window._kaplayInstance = initKaplay();
  }
  const k = window._kaplayInstance;

  // === Button setup: only once per load ===
  if (typeof document !== 'undefined' && !document.getElementById('restartShuffle')) {
    const btn = document.createElement('button');
    btn.id = 'restartShuffle';
    btn.textContent = 'Restart Shuffle';
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
      cardShuffle();
    });
  }

  // === Clear old card entities ===
  ["cardBack0", "cardBack1", "cardBack2"].forEach(tag => {
    const ents = k.get(tag) || [];
    ents.forEach(ent => {
      if (ent && ent.destroy) ent.destroy();
    });
  });

  // Load card textures (only once)
  if (!k._spritesLoaded) {
    await k.loadSprite("cardBack0", "/cardBack.png");
    await k.loadSprite("cardBack1", "/cardBack.png");
    await k.loadSprite("cardBack2", "/cardBack.png");
    k._spritesLoaded = true;
  }

  // Set home positions and create cards
  const homeX = [600, 950, 1300];
  for (let i = 0; i < 3; i++) {
    k.add([
      k.sprite("cardBack" + i),
      k.pos(homeX[i], 450),
      k.anchor("center"),
      k.scale(0.5),
      k.area(),
      k.body({ isStatic: true }),
      "cardBack" + i
    ]);
  }

  // Grab fresh entities
  const cards = [
    k.get("cardBack0")[0],
    k.get("cardBack1")[0],
    k.get("cardBack2")[0]
  ];

  // 1) Hop each card
  for (let i = 0; i < cards.length; i++) {
    await animateHop(k, cards[i], homeX[i]);
  }

  // 2) Scatter shuffle: random moves
  const scatterCount = 6;
  for (let pass = 0; pass < scatterCount; pass++) {
    cards.forEach(card => {
      if (card && card.pos) {
        const randX = Math.random() * 800 + 400;
        const randY = Math.random() * 300 + 300;
        k.tween(
          card.pos,
          k.vec2(randX, randY),
          400,
          v => { card.pos = v; }
        );
      }
    });
    //await k.wait(1);
  }

  // 3) Gather back: return to home positions
  cards.forEach((card, idx) => {
    if (card && card.pos) {
      k.tween(
        card.pos,
        k.vec2(homeX[idx], 450),
        600,
        v => { card.pos = v; }
      );
    }
  });
  //await k.wait(2);
}

// Helper: hop animation with ms durations
async function animateHop(k, card, x) {
  if (!card || !card.pos) return;
  k.tween(
    card.pos,
    k.vec2(x, 400),
    30,
    v => { card.pos = v; }
  );
  //await k.wait(1);
  k.tween(
    card.pos,
    k.vec2(x, 450),
    20,
    v => { card.pos = v; }
  );
  //await k.wait(2);
}