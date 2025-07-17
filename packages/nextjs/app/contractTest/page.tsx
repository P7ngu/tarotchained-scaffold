"use client";

import { NextPage } from "next";
//import Image from "next/image";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
// Import card metadata JSON
import cardsJson from "~~/majorArcana.json";

type CardInfo = {
  id_card: number;
  name: string;
  uri_card: string;
};

const PlayerCardsPage: NextPage = () => {
  // 1️⃣ grab the connected wallet
  const { address } = useAccount();

  // 2️⃣ call getPlayerCards with the user's address (auto-updates on change)
  const { data: playerCards } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getPlayerCards",
    args: [address],
    watch: true,
  });

  // 3️⃣ process cards: count occurrences and lookup metadata
  const cardCounts: Record<number, number> = {};
  if (playerCards) {
    playerCards.forEach((id: bigint) => {
      const num = Number(id);
      cardCounts[num] = (cardCounts[num] || 0) + 1;
    });
  }

  const uniqueCards = Object.entries(cardCounts).map(([idStr, count]) => {
    const id = Number(idStr);
    const info = (cardsJson as CardInfo[]).find(card => card.id_card === id);
    return {
      id,
      name: info ? info.name : `Card #${id}`,
      uri: info ? info.uri_card : "",
      count,
    };
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Cards</h1>
      {!address ? (
        <p>Connect your wallet to see your cards.</p>
      ) : playerCards ? (
        uniqueCards.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {uniqueCards.map(({ id, name, uri, count }) => (
              <li key={id} style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {uri && (
                    <img
                      src={uri}
                      alt={name}
                      style={{ width: 80, height: 80, marginRight: "1rem", objectFit: "cover" }}
                      onError={() => console.error(`Failed to load image at ${uri}`)}
                    />
                  )}
                  <div>
                    <strong style={{ fontSize: "1.2rem" }}>{name}</strong>
                    <p>Copies: {count}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You don’t have any cards yet.</p>
        )
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
};

export default PlayerCardsPage;
