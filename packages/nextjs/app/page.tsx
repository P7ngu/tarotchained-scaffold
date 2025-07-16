"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Header } from "~~/components/Header";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <Header />
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            {/* Escape the apostrophe or wrap in a JS expression */}
            <span className="block text-4xl font-bold">The Fool&apos;s Journey</span>
          </h1>

          <div className="flex justify-center items-center space-x-2 flex-col">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/game">
              {/* Note: Next’s Link no longer needs passHref on button children */}
              <button
                className="w-48 h-48 bg-no-repeat bg-center bg-contain"
                style={{ backgroundImage: "url('/start-button.png')" }}
                aria-label="Start Game"
              ></button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
