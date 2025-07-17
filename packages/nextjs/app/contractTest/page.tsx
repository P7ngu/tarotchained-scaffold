"use client";

import { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

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

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Cards</h1>
      {!address ? (
        <p>Connect your wallet to see your cards.</p>
      ) : playerCards ? (
        <ul>
          {playerCards.map((id: bigint, i: number) => (
            <li key={i}>Card #{id.toString()}</li>
          ))}
        </ul>
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
};

export default PlayerCardsPage;
