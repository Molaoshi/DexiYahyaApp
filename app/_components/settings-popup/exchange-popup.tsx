"use client";
import BridgeExchangeTemplate from "./bridge-exchage-template";
import React, { ReactNode, useEffect, useState } from "react";
import { BridgeEnum, Exchange } from "@/app/types/interface";
import { getExchanges } from "@/app/api/rango-api";
import { useAppDispatch } from "@/redux/provider";
import { updateTotalExchanges } from "@/redux/slice/settingsSlice";

const ExchangePopup = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [exchangesData, setExchangesData] = useState<Exchange[]>([]);
  useEffect(() => {
    getExchanges().then((data) => {
      setExchangesData(data);
      dispatch(updateTotalExchanges({ value: data?.length }));
    });
  }, []);
  return (
    <BridgeExchangeTemplate
      title="Exchanges"
      exhangeData={exchangesData}
      type={BridgeEnum.EXCHANGE}
    >
      {children}
    </BridgeExchangeTemplate>
  );
};

export default ExchangePopup;
