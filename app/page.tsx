"use client";
import ExchangeCard from "./_components/exchange-card/ExchangeCard";
import RoutesCard from "./_components/routes-card/routes-card";
import SwapDetailsCard from "./_components/swap-details-card";
import Web3ModalProvider from "./providers/Web3ModalProvider";
import { useAppSelector } from "@/redux/provider";

export default function Home() {
  const { isRoutesFetched } = useAppSelector((state) => state.routes);
  const { isSwapMade, isInProcess } = useAppSelector((state) => state.swap);

  return (
    <Web3ModalProvider>
      <main className="h-screen p-4 md:pt-32 w-full flex justify-center items-center gap-x-5 bg-[url('/assets/background.png')] bg-cover">
        {(isSwapMade || isInProcess) && (
          <div className="w-1/3">
            <SwapDetailsCard />
          </div>
        )}

        <div
          className={`${
            isSwapMade || isInProcess
              ? "w-1/3"
              : isRoutesFetched
              ? "w-5/12"
              : "w-[55.9375rem]"
          }`}
        >
          <ExchangeCard />
        </div>

        {isRoutesFetched && (
          <div className={`${isSwapMade || isInProcess ? "w-1/3" : "w-5/12"}`}>
            <RoutesCard />
          </div>
        )}
      </main>
    </Web3ModalProvider>
  );
}
