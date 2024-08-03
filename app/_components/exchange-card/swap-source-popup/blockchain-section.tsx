import Image from "next/image";
import TooltipTemplate from "../../common/tooltip-template";
import React, { ReactNode } from "react";
import { Blockchain } from "@/app/types/interface";
import { toastSuccess } from "@/lib/utils";
import { useDispatch } from "react-redux";
import {
  updateFromBlockchain,
  updateToBlockchain,
} from "@/redux/slice/blockchainSlice";
import AllBlockchainsPopup from "./all-blockchains-popup";
import { resetToken } from "@/redux/slice/tokenSLice";
import { resetRoute } from "@/redux/slice/routeSlice";
import { resetSwap } from "@/redux/slice/swapSlice";

const BlockchainSection: React.FC<{
  blockchains: Blockchain[];
  selectedBlockchain: Blockchain;
  isFromBlockchain: boolean;
}> = ({ blockchains, selectedBlockchain, isFromBlockchain }) => {
  const dispatch = useDispatch();

  const updateBlockchain = (blockchain: Blockchain) => {
    if (isFromBlockchain) {
      dispatch(updateFromBlockchain({ blockchain }));
      dispatch(resetToken({ isFromToken: true }));
    } else {
      dispatch(updateToBlockchain({ blockchain }));
      dispatch(resetToken({ isFromToken: false }));
    }
    dispatch(resetRoute());
    dispatch(resetSwap());
  };

  const blockchainTemplate = (
    id = "",
    name = "",
    onClick: Function,
    content: ReactNode
  ) => (
    <div
      className={`px-3.5 py-3 flex items-center justify-center border rounded-3xl bg-transparent hover:bg-white/5 transition-colors duration-300 cursor-pointer ${
        selectedBlockchain?.chainId === id
          ? "border-primary"
          : "border-seperator"
      }`}
      onClick={() => onClick()}
      key={`${id}-${name}`}
    >
      {content}
    </div>
  );

  const sortedBlockchains = selectedBlockchain
    ? [
        selectedBlockchain,
        ...blockchains.filter((b) => b.chainId !== selectedBlockchain.chainId),
      ]
    : blockchains;

  const totalBlockchains = sortedBlockchains.length;
  const firstSevenBlockchains = sortedBlockchains.slice(0, 7);
  const allBlockchains = sortedBlockchains.slice(0, 8);

  return (
    <section className="mb-6">
      <h1 className="capitalize text-base sm:text-lg mb-6">
        select blockchain
      </h1>

      <div className="grid grid-cols-4 gap-x-2.5 gap-y-6">
        {totalBlockchains <= 8
          ? allBlockchains.map((blockchain, index) => {
              const { chainId, name, logo } = blockchain;
              return (
                <TooltipTemplate
                  content={name}
                  className="!-mb-3"
                  key={`${chainId}-${name}`}
                >
                  {blockchainTemplate(
                    chainId,
                    name,
                    () => updateBlockchain(blockchain),
                    <Image
                      key={index}
                      src={logo}
                      width={58}
                      height={58}
                      alt={`${name}'s icon`}
                      className="!w-[3.625rem] !h-[3.625rem]"
                    />
                  )}
                </TooltipTemplate>
              );
            })
          : firstSevenBlockchains.map((blockchain, index) => {
              const { chainId, name, logo } = blockchain;
              return (
                <TooltipTemplate
                  content={name}
                  className="!-mb-3"
                  key={`${chainId}-${name}`}
                >
                  {blockchainTemplate(
                    chainId,
                    name,
                    () => {
                      updateBlockchain(blockchain);
                      toastSuccess(
                        `${blockchain.name}'s selected as the blockchain`
                      );
                    },

                    <Image
                      key={index}
                      src={logo}
                      width={58}
                      height={58}
                      alt={`${name}'s icon`}
                      className="!w-[3.625rem] !h-[3.625rem]"
                    />
                  )}
                </TooltipTemplate>
              );
            })}

        {totalBlockchains > 8 && (
          <AllBlockchainsPopup
            data={blockchains}
            isFromBlockchain={isFromBlockchain}
          >
            {blockchainTemplate(
              "",
              "",
              () => {},
              <h3 className="text-sm text-center">View More</h3>
            )}
          </AllBlockchainsPopup>
        )}
      </div>
    </section>
  );
};

export default BlockchainSection;
