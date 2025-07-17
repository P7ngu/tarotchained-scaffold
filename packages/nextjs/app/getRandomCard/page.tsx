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
      <div className="button-wrap">
        <button className="assign-button" onClick={() => handleAssignRandomCard(address!)} disabled={!address}>
          Draw a Random Card
        </button>
      </div>

      {/* 📜 Show owned cards */}
      {ownedCards.length === 0 ? (
        <p className="empty">You don’t own any cards yet.</p>
      ) : (
        <ul className="cards-list">
          {ownedCards.map(card => (
            <li key={card.id_card} className="card-item">
              <div className="card-image">
                <img src={card.uri_card} alt={card.name} />
              </div>
              <div className="card-content">
                <h3 className="card-name">{card.name}</h3>
                <p className="card-desc">{card.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .cards-container {
          padding: 2rem 1rem;
          max-width: 900px;
          margin: 0 auto;
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }
        .title {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 1.5rem;
          color: #2c3e50;
        }
        .status {
          text-align: center;
          font-size: 1rem;
          color: #7f8c8d;
        }
        .status.error {
          color: #e74c3c;
        }
        .button-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 1.75rem;
        }
        .assign-button {
          background: #3498db;
          color: #fff;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition:
            background 0.2s,
            transform 0.2s;
        }
        .assign-button:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }
        .assign-button:hover:not(:disabled) {
          background: #2980b9;
          transform: translateY(-2px);
        }
        .empty {
          text-align: center;
          font-style: italic;
          color: #95a5a6;
        }
        .cards-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .card-item {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }
        .card-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }
        .card-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .card-content {
          padding: 1rem;
          flex-grow: 1;
        }
        .card-name {
          margin: 0 0 0.5rem;
          font-size: 1.25rem;
          color: #34495e;
        }
        .card-desc {
          margin: 0;
          font-size: 0.9rem;
          color: #7f8c8d;
        }
      `}</style>
    </section>
  );
}
