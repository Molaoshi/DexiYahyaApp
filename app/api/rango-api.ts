import { axiosClient } from "@/lib/axios-client";
import {
  Bridge,
  Token,
  Exchange,
  BestRoutesResponse,
  DiagnosticMessage,
  RouteData,
  TxSwapRequest,
  TxSwapResponse,
} from "../types/interface";
import axios, { AxiosResponse } from "axios";

export async function getBlockchains() {
  const data: AxiosResponse = await axiosClient.get(
    "/meta/blockchains?apiKey=" + process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC
  );
  const blockchains = data.data;
  return blockchains;
}
export async function getBlockchainTokens(blockchainName: string) {
  const data: AxiosResponse = await axiosClient.get(
    `/meta?blockchains=${blockchainName}&apiKey=` +
      process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC
  );
  const tokens = data.data.tokens as Token[];
  return tokens;
}
export async function getBridges(): Promise<Bridge[]> {
  const response: AxiosResponse = await axiosClient.get(
    "/meta/swappers?apiKey=" + process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC
  );
  const swappers = response.data as Bridge[];
  const bridges = swappers.filter((swapper) =>
    swapper.types.includes("BRIDGE")
  );
  return bridges;
}

export async function getExchanges(): Promise<Exchange[]> {
  const response: AxiosResponse = await axiosClient.get(
    "/meta/swappers?apiKey=" + process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC
  );
  const swappers = response.data as Exchange[];
  const exchanges = swappers.filter((swapper) => swapper.types.includes("DEX"));
  return exchanges;
}

export async function getBestRoutes(
  data: RouteData
): Promise<BestRoutesResponse> {
  try {
    const response: AxiosResponse = await axiosClient.post(
      `https://api.rango.exchange/routing/bests?apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`,
      data
    );

    console.log(response.data);
    const bestRoutesResponse = response.data as BestRoutesResponse;

    // Validate the results data
    if (
      !bestRoutesResponse.results ||
      bestRoutesResponse.results.length === 0
    ) {
      throw new Error("No routes found");
    }

    return bestRoutesResponse;
  } catch (error: unknown) {
    let diagnosticMessage: DiagnosticMessage = {
      status: "error",
      message: "An unknown error occurred",
    };

    if (error instanceof Error) {
      diagnosticMessage.message = error.message;

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        diagnosticMessage.message = error.response.data.message;
        if (error.response.data.actionUrl) {
          diagnosticMessage.actionUrl = error.response.data.actionUrl;
        }
      }
    }

    console.error("Error fetching best routes:", diagnosticMessage);
    throw diagnosticMessage;
  }
}

export async function createTransaction(
  params: TxSwapRequest
): Promise<TxSwapResponse> {
  try {
    const response: AxiosResponse = await axiosClient.get(
      `https://api.rango.exchange/basic/swap?from=${params.from}&to=${params.to}&amount=${params.amount}&slippage=${params.slippage}&fromAddress=${params.fromAddress}&toAddress=${params.toAddress}&apiKey=${process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC}`
    );

    const swapResponse = response.data as TxSwapResponse;

    if (swapResponse.resultType != "OK") {
      console.log(swapResponse);

      throw new Error(swapResponse.error || "Unknown error occurred");
    }

    return swapResponse;
  } catch (error: unknown) {
    let diagnosticMessage: DiagnosticMessage = {
      status: "error",
      message: "An unknown error occurred",
    };

    if (error instanceof Error) {
      diagnosticMessage.message = error.message;

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        diagnosticMessage.message = error.response.data.message;
        if (error.response.data.actionUrl) {
          diagnosticMessage.actionUrl = error.response.data.actionUrl;
        }
      }
    }

    console.error("Error creating swap transaction:", diagnosticMessage);
    throw diagnosticMessage;
  }
}
