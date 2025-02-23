import PopupTemplate from "../../common/popup-template";
import BlockchainSection from "./blockchain-section";
import TokenSection from "./token-section";
import Image from "next/image";
import React from "react";
import { Blockchain } from "@/app/types/interface";
import { useAppSelector } from "@/redux/provider";

const SwapSourcePopup: React.FC<{
  blockchains: Blockchain[];
  isFromToken: boolean;
}> = ({ blockchains, isFromToken }) => {
  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);

  const selectedBlockchain = useAppSelector((state) =>
    isFromToken
      ? state?.blockchains?.fromBlockchain
      : state?.blockchains?.toBlockchain
  );

  const selectedToken = useAppSelector((state) =>
    isFromToken ? state?.tokens?.fromToken : state?.tokens?.toToken
  );

  const triggerButton = (
    <button
      className="w-[150px] bg-transparent focus:ring-0 border-none focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0 flex items-center justify-center gap-[.5625rem] text-sm disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isInProcess || isSwapMade}
    >
      {selectedToken?.image && (
        <Image
          src={selectedToken?.image}
          width={21.74}
          height={21.74}
          alt={`${selectedToken?.symbol}'s icon`}
        />
      )}

      {selectedToken?.symbol !== "" ? selectedToken?.symbol : "Select Token"}
    </button>
  );

  return (
    <PopupTemplate title="Swap source" triggerButton={triggerButton}>
      <main>
        <BlockchainSection
          blockchains={blockchains}
          selectedBlockchain={selectedBlockchain}
          isFromBlockchain={isFromToken}
        />

        {selectedBlockchain !== null && (
          <TokenSection
            selectedBlockchain={selectedBlockchain}
            isFromToken={isFromToken}
          />
        )}
      </main>
    </PopupTemplate>
  );
};

export default SwapSourcePopup;
