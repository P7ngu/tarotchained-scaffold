"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function MyPlayerCards() {
  const { address } = useAccount();
  const router = useRouter();

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
      // After drawing, navigate to collection page
      router.push("/contractTest");
    } catch (error) {
      console.error("Error assigning random card:", error);
    }
  };

  return (
    <section className="cards-container">
      <h2 className="title">Add a piece to your story</h2>

      {/* 🃏 Draw a new random card */}
      <div className="button-wrap">
        <button className="assign-button" onClick={() => handleAssignRandomCard(address!)} disabled={!address}>
          🎴 Draw Random Card 🎴
        </button>
      </div>

      {/* 🔍 View your full collection */}
      <div className="button-wrap">
        <Link href="/contractTest" className="view-collection-button">
          ✨ View Your Collection ✨
        </Link>
      </div>

      <style jsx>{`
        .cards-container {
          padding: 2rem 1rem;
          max-width: 900px;
          margin: 0 auto;
          background: #fdfdfd;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
        }
        .title {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 2rem;
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
          margin-bottom: 1.5rem;
        }
        .assign-button {
          background: linear-gradient(135deg, #8e44ad 0%, #2980b9 100%);
          color: #fff;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          transition:
            box-shadow 0.2s,
            transform 0.2s;
        }
        .assign-button:disabled {
          background: #bdc3c7;
          box-shadow: none;
          cursor: not-allowed;
        }
        .assign-button:not(:disabled):hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        .view-collection-button {
          display: inline-block;
          background: linear-gradient(135deg, #f39c12 0%, #d35400 100%);
          color: #fff;
          text-decoration: none;
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 50px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }
        .view-collection-button:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        .empty {
          text-align: center;
          font-style: italic;
          color: #95a5a6;
        }
        .cards-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .card-item {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }
        .card-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
        }
        .card-image img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          display: block;
        }
        .card-content {
          padding: 0.75rem;
          flex-grow: 1;
        }
        .card-name {
          margin: 0 0 0.25rem;
          font-size: 1rem;
          color: #34495e;
        }
        .card-desc {
          margin: 0;
          font-size: 0.8rem;
          color: #7f8c8d;
        }
      `}</style>
    </section>
  );
}
