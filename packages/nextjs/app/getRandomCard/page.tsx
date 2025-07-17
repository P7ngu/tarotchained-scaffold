"use client";

import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import cardsJson from "~~/majorArcana.json";

export default function MyPlayerCards() {
  const { address, isConnected, isConnecting } = useAccount();

  // 1️⃣ Read your current cards
  const {
    data: playerCards,
    isLoading: isReading,
    error: readError,
  } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getPlayerCards",
    args: [address],
    watch: Boolean(address),
  });

  // 2️⃣ Prepare the write hook to assign randomly
  const { writeContractAsync: writeToAssignRandomCard } = useScaffoldWriteContract({
    contractName: "YourContract",
  });

  const handleAssignRandomCard = async (to: string) => {
    try {
      await writeToAssignRandomCard({
        functionName: "assignCardRandomly",
        args: [to],
      });
    } catch (error) {
      console.error("Error assigning random card:", error);
    }
  };

  // 3️⃣ Compute owned card IDs & metadata
  const ownedCardIds = useMemo(() => {
    if (!playerCards) return [];
    return playerCards.map((bal: bigint, idx: number) => (bal > 0n ? idx : -1)).filter(i => i >= 0);
  }, [playerCards]);

  const ownedCards = useMemo(() => cardsJson.filter(card => ownedCardIds.includes(card.id_card)), [ownedCardIds]);

  // 4️⃣ Handle loading / error states
  if (isConnecting) return <p className="status">Detecting wallet…</p>;
  if (!isConnected) return <p className="status">Please connect your wallet.</p>;
  if (isReading) return <p className="status">Loading your cards…</p>;
  if (readError) return <p className="status error">Error: {String(readError)}</p>;

  return (
    <section className="cards-container">
      <h2 className="title">Your Cards</h2>

      {/* 🃏 Draw a new random card */}
      <button className="assign-button" onClick={() => handleAssignRandomCard(address!)} disabled={!address}>
        Draw a Random Card
      </button>

      {/* 📜 Show owned cards */}
      {ownedCards.length === 0 ? (
        <p className="empty">You don’t own any cards yet.</p>
      ) : (
        <ul className="cards-list">
          {ownedCards.map(card => (
            <li key={card.id_card} className="card-item">
              <img src={card.uri_card} alt={card.name} />
              <div className="card-content">
                <h3>{card.name}</h3>
                <p>{card.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* …your existing styles… */}
    </section>
  );
}
