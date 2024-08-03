"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/provider";
import { setSelectedRoute } from "@/redux/slice/routeSlice";
import { Result, Swap } from "@/app/types/interface";
import { useAccount } from "wagmi";

const RoutesCard = () => {
  const account = useAccount();
  const routes = useAppSelector((state) => state.routes);
  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const optionsButton = (text: string, id: number) => (
    <button
      className={`px-3.5 py-1.5 border border-primary rounded-full text-xs font-medium leading-[.9rem] transition-colors duration-300 ${
        selectedOption === id
          ? "bg-primary text-black cursor-default"
          : "bg-transparent text-white hover:bg-white/10 "
      } disabled:cursor-not-allowed `}
      onClick={() => setSelectedOption(id)}
      disabled={isInProcess || isSwapMade}
    >
      {text}
    </button>
  );

  const singleNodeTemplate = (logo: string, symbol: string, amount: string) => (
    <>
      <div className="w-[3.125rem] h-[3.125rem] p-3 border border-white border-dashed rounded-full">
        <Image src={logo} width={26} height={26} alt={`${symbol}'s icon`} />
      </div>

      <h1 className="text-[.625rem] text-white ">
        {amount} {symbol}
      </h1>
    </>
  );

  const singleRouteContainer = (route: Result) => (
    <button
      className={`w-full mb-3.5 flex max-w-full overflow-x-auto pt-3 pb-4 ps-3 bg-[#111815] border rounded-xl ${
        routes.selectedRoute?.requestId !== route.requestId
          ? "border-seperator"
          : "border-primary"
      } disabled:opacity-40 disabled:cursor-not-allowed`}
      onClick={() => dispatch(setSelectedRoute({ route: route }))}
      key={route.requestId}
      disabled={isInProcess || isSwapMade}
    >
      {route.swaps.map((singleNode: Swap, index: number) => {
        const isEven = index % 2 == 0;
        const containerClasses =
          "min-w-fit flex flex-col items-center justify-start gap-y-1.5";

        return (
          <div key={index} className="flex items-start">
            <div
              className={`relative ${
                !isEven && "mt-[3.125rem] ms-4"
              } ${containerClasses}`}
            >
              {singleNodeTemplate(
                singleNode.from.logo as string,
                singleNode.from.symbol,
                parseFloat(singleNode.fromAmount).toFixed(3)
              )}

              {isEven ? (
                <Image
                  src="/assets/icons/arrow-down.svg"
                  width={59}
                  height={21}
                  alt="Arrow down"
                  className="absolute -right-[3.125rem] top-6"
                />
              ) : (
                <Image
                  src="/assets/icons/arrow-up.svg"
                  width={28.5}
                  height={59}
                  alt="Arrow up"
                  className="absolute -right-[1.5625rem] -top-[1.875rem]"
                />
              )}
            </div>

            {route.swaps.length === index + 1 && (
              <div
                className={`
                  ${isEven ? "mt-[3.125rem] ms-7" : "ms-5"}
                  ${containerClasses}`}
              >
                {singleNodeTemplate(
                  singleNode.to.logo as string,
                  singleNode.to.symbol,
                  parseFloat(singleNode.toAmount).toFixed(3)
                )}
              </div>
            )}
          </div>
        );
      })}
    </button>
  );

  return (
    account.isConnected && (
      <div className="relative lg:h-[34.0625rem] lg:w-full pb-2 pt-[1.8125rem] px-[1.1875rem] rounded-3xl border border-seperator bg-black bg-opacity-5 backdrop-filter backdrop-blur-lg shadow-lg">
        <div className="z-0 w-full">
          <h1 className="text-2xl mb-4">Routes</h1>

          <div className="mb-4 flex items-center gap-x-3">
            {optionsButton("Recommended", 0)}
            {optionsButton("Cheap", 1)}
            {optionsButton("Fastest", 2)}
          </div>

          <div className="overflow-y-auto lg:max-h-[25rem] pe-2">
            {routes.routes.map((item) => singleRouteContainer(item))}
          </div>
        </div>
        <div className="absolute lg:max-h-[32.875rem] lg:max-w-[23.875rem] bg-gradient-to-b from-black/0 to-[#050F0F] z-10" />
      </div>
    )
  );
};

export default RoutesCard;
