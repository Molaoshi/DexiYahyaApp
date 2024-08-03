"use client";

import Image from "next/image";
import PopupTemplate from "@/app/_components/common/popup-template";
import Search from "@/app/_components/common/search";
import React, { ReactNode, useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { DialogClose } from "@radix-ui/react-dialog";
import { Blockchain } from "@/app/types/interface";
import { useAppDispatch, useAppSelector } from "@/redux/provider";
import {
  updateFromBlockchain,
  updateToBlockchain,
} from "@/redux/slice/blockchainSlice";
import { toastSuccess } from "@/lib/utils";
import { resetToken } from "@/redux/slice/tokenSLice";
import { resetRoute } from "@/redux/slice/routeSlice";
import { resetSwap } from "@/redux/slice/swapSlice";

const AllBlockchainsPopup = ({
  data,
  children,
  isFromBlockchain,
}: {
  data?: Blockchain[];
  children: ReactNode;
  isFromBlockchain: boolean;
}) => {
  const dispatch = useAppDispatch();

  const selectedBlockchain = useAppSelector((state) =>
    isFromBlockchain
      ? state.blockchains.fromBlockchain
      : state.blockchains.toBlockchain
  );
  const [search, setSearch] = useState<string>("");

  const handleItemClick = (blockchain: Blockchain) => {
    if (isFromBlockchain) {
      dispatch(updateFromBlockchain({ blockchain }));
      dispatch(resetToken({ isFromToken: true }));
    } else {
      dispatch(updateToBlockchain({ blockchain }));
      dispatch(resetToken({ isFromToken: false }));
    }
    dispatch(resetRoute());
    dispatch(resetSwap());
    toastSuccess(`${blockchain.name}'s selected as the blockchain`);
  };

  const filteredBlockchains = (data ?? []).filter((item) =>
    item.name != null
      ? item?.name?.toLowerCase().includes(search.toLowerCase())
      : false
  );

  return (
    <PopupTemplate
      title={"Blockchains"}
      triggerButton={children}
      topButton={
        <DialogClose className="flex items-center justify-center">
          <FaArrowLeft className="w-8 h-8 p-1.5 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
        </DialogClose>
      }
    >
      <>
        <Search search={search} setSearch={setSearch} />

        <DialogClose className="sm:mx-[.5813rem] overflow-y-auto max-h-[50vh] pe-6">
          <div>
            {filteredBlockchains.map((item) => {
              const isSelected = selectedBlockchain?.chainId?.includes(
                item.chainId
              );

              return (
                <div
                  key={`${item.chainId}-${item.name}`}
                  className="pb-[.875rem] mb-6 flex items-center justify-between border-b border-seperator cursor-pointer transition-all duration-300"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex gap-[.875rem]">
                    <Image
                      src={item.logo}
                      alt={`${item.name}'s icon`}
                      width={26}
                      height={26}
                      className="!w-[26px] !h-[26px]"
                    />

                    <h2 className="text-base sm:text-lg">{item.name}</h2>
                  </div>

                  <div
                    className={`w-5 h-5 ${
                      isSelected
                        ? "bg-primary text-black"
                        : "bg-transparent border border-seperator"
                    } rounded-full flex items-center justify-center  `}
                  >
                    {isSelected && <FaCheck size={12.5} />}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogClose>
      </>
    </PopupTemplate>
  );
};

export default AllBlockchainsPopup;
