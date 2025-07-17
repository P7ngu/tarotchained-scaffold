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
  if (isConnecting) return <p className="status">Detecting wallet…</p>;
  if (!isConnected) return <p className="status">Please connect your wallet.</p>;
  if (isLoading) return <p className="status">Loading your cards…</p>;
  if (error) return <p className="status error">Error loading cards: {String(error)}</p>;

  return (
    <section className="cards-container">
      <h2 className="title">Your Cards</h2>
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
          padding: 1rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .title {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          text-align: center;
          color: #333;
        }
        .status {
          text-align: center;
          font-size: 1rem;
          color: #555;
        }
        .status.error {
          color: #c00;
        }
        .empty {
          text-align: center;
          font-style: italic;
          color: #777;
        }
        .cards-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .card-item {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
        }
        .card-item:hover {
          transform: translateY(-4px);
        }
        .card-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .card-content {
          padding: 0.75rem;
          flex-grow: 1;
        }
        .card-name {
          font-size: 1.25rem;
          margin: 0 0 0.5rem;
          color: #222;
        }
        .card-desc {
          font-size: 0.875rem;
          margin: 0;
          color: #555;
        }
      `}</style>
    </section>
  );
}
