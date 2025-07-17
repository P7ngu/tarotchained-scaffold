"use client";

import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import cardsJson from "~~/majorArcana.json";

export default function MyPlayerCards() {
  const { address, isConnected, isConnecting } = useAccount();

  // Always pass a 1-tuple of (string | undefined)
  const {
    data: playerCards,
    isLoading,
    error,
  } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getPlayerCards",
    args: [address], // ← the fix: always one-element array
    watch: Boolean(address),
  });

  // Hooks must always be called in the same order:
  const ownedCardIds = useMemo(() => {
    if (!playerCards) return [];
    return playerCards.map((bal: bigint, idx: number) => (bal > 0n ? idx : -1)).filter(i => i >= 0);
  }, [playerCards]);

  const ownedCards = useMemo(() => {
    return cardsJson.filter(card => ownedCardIds.includes(card.id_card));
  }, [ownedCardIds]);

  // UI states
  if (isConnecting) return <p>Detecting wallet…</p>;
  if (!isConnected) return <p>Please connect your wallet.</p>;
  if (isLoading) return <p>Loading your cards…</p>;
  if (error) return <p>Error loading cards: {String(error)}</p>;

  return (
    <div>
      <h2>Your Cards</h2>
      {ownedCards.length === 0 ? (
        <p>You don’t own any cards yet.</p>
      ) : (
        <ul>
          {ownedCards.map(card => (
            <li key={card.id_card}>
              <img src={card.uri_card} alt={card.name} width={64} height={64} />
              <h3>{card.name}</h3>
              <p>{card.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
