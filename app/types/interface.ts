export interface RootState {
  tokens: { fromToken: Token; toToken: Token };
  blockchains: { fromBlockchain: Blockchain; toBlockchain: Blockchain };
}

export interface CryptoCurrency {
  code: string;
  name: string;
}
interface BlockchainInfo {
  infoType: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  addressUrl: string;
  transactionUrl: string;
  enableGasV2: boolean;
}

interface FeeAsset {
  blockchain: string;
  symbol: string;
  address: string | null;
}

export interface Blockchain {
  name: string;
  defaultDecimals: number;
  addressPatterns: string[];
  feeAssets: FeeAsset[];
  type: string;
  chainId: string;
  logo: string;
  displayName: string;
  shortName: string;
  sort: number;
  color: string;
  enabled: boolean;
  info: BlockchainInfo | null;
}
export interface Token {
  blockchain: string;
  symbol: string;
  image: string;
  address: string;
  usdPrice: number;
  decimals: number;
  name: string;
  isPopular: boolean;
  isSecondaryCoin: boolean;
  coinSource: string;
  coinSourceUrl: string;
  supportedSwappers: string[];
  value: number | string;
}
export interface Bridge {
  id: string;
  title: string;
  logo: string;
  swapperGroup: string;
  types: string[];
  enabled: boolean;
}
export interface Exchange {
  id: string;
  title: string;
  logo: string;
  swapperGroup: string;
  types: string[];
  enabled: boolean;
}

export interface Settings {
  bridges: string[];
  selectedBridgesCounter: number;
  totalBridges: number;
  exchanges: string[];
  selectedExchangesCounter: number;
  totalExchanges: number;
  slippage: number;
  infiniteApproval: boolean;
}

export interface TokenData {
  blockchain: string;
  symbol: string;
  address: string;
  logo?: string;
}

export interface Fee {
  asset: Token;
  expenseType: string;
  amount: number;
  name: string;
  meta: {
    type: string;
    gasLimit: number;
    gasPrice: number;
  };
  price: number;
}

//Routes and swap
export interface Swap {
  swapperId: string;
  swapperLogo: string;
  swapperType: string;
  from: TokenData;
  to: TokenData;
  fromAmount: string;
  fromAmountPrecision: number;
  fromAmountMinValue: number;
  fromAmountMaxValue: number;
  fromAmountRestrictionType: string;
  toAmount: string;
  fee: Fee[];
  estimatedTimeInSeconds: number;
  swapChainType: string;
  routes: Route[];
  recommendedSlippage: {
    error: boolean;
    slippage: number;
  };
  warnings: string[];
  timeStat: {
    min: number;
    avg: number;
    max: number;
  };
  includesDestinationTx: boolean;
  maxRequiredSign: number;
}

export interface Route {
  nodes: {
    nodes: RouteNode[];
    from: string;
    fromLogo: string;
    fromAddress: string;
    fromBlockchain: string;
    to: string;
    toLogo: string;
    toAddress: string;
    toBlockchain: string;
  }[];
}

interface RouteNode {
  marketName: string;
  marketId: string;
  percent: number;
  pools: any[];
  inputAmount: string | null;
  outputAmount: string | null;
}

//This is a Route.
export interface Result {
  requestId: string;
  outputAmount: string;
  swaps: Swap[];
  resultType: string;
  scores: Score[];
  tags: Tag[];
  validationStatus: ValidationStatus[];
  walletNotSupportingFromBlockchain: boolean;
  missingBlockchains: string[];
}

export interface Score {
  preferenceType: string;
  score: number;
}
// Recoma
export interface Tag {
  label: string;
  value: string;
}

export interface ValidationStatus {
  blockchain: string;
  wallets: Wallet[];
}

export interface Wallet {
  address: string;
  requiredAssets: RequiredAsset[];
  addressIsValid: boolean;
  validResult: boolean;
}

export interface RequiredAsset {
  asset: Token;
  requiredAmount: Amount;
  currentAmount: Amount;
  reason: string;
  ok: boolean;
}

export interface Amount {
  amount: number;
  decimals: number;
}

export interface BestRoutesResponse {
  from: Token;
  to: Token;
  requestAmount: number;
  routeId: string;
  results: Result[];
  processingLimitReached: boolean;
  diagnosisMessages: string[];
  error: string;
  errorCode: number;
  traceId: number;
}

export interface DiagnosticMessage {
  status: string;
  message: string;
  actionUrl?: string;
}

export interface RouteData {
  from: TokenData;
  to: TokenData;
  amount: number;
}

export enum BridgeEnum {
  BRIDGE,
  EXCHANGE,
}

//====================Transaction
export interface TxSwapRequest {
  from: string;
  to: string;
  amount: number;
  slippage: number;
  fromAddress: string;
  toAddress: string;
  disableEstimate?: boolean;
  swappers?: string[];
  swappersExclude?: boolean;
  swapperGroups?: string[];
  swappersGroupsExclude?: boolean;
  messagingProtocols?: string[];
  imMessage?: string;
  sourceContract?: string;
  destinationContract?: string;
  infiniteApprove?: boolean;
  contractCall?: boolean;
  referrerFee?: number;
  referrerAddress?: string;
  referrerCode?: string;
  avoidNativeFee?: boolean;
  enableCentralizedSwappers?: boolean;
}

export interface TxSwapResponse {
  requestId: string;
  inputAmount?: number;
  resultType: string;
  error?: string;
  errorCode?: number;
  traceId?: number;
  route?: TxRoute;
  tx: TxTransaction;
}

export interface TxTransaction {
  type: string;
  from: string;
  blockChain: string;
  data: TxData;
  rawTransfer: TxRawTransfer;
}

export interface TxData {
  chainId: string;
  account_number: number;
  sequence: number;
  msgs: any[];
  protoMsgs: TxProtoMsg[];
  memo: string;
  source: number;
  fee: TxFee;
  signType: string;
  rpcUrl: string;
}

export interface TxProtoMsg {
  type_url: string;
  value: number[];
}

export interface TxFee {
  gas: string;
  amount: TxFeeAmount[];
}

export interface TxFeeAmount {
  denom: string;
  amount: string;
}

export interface TxRawTransfer {
  method: string;
  asset: TxAsset;
  amount: number;
  decimals: number;
  recipient: string;
  memo: string;
}

export interface TxAsset {
  blockchain: string;
  symbol: string;
  address: string;
  ticker: string;
}
export interface TxRoute {
  outputAmount: number;
  outputAmountMin: number;
  outputAmountUsd: number;
  swapper: TxSwapper;
  from: TxAssetDetail;
  to: TxAssetDetail;
  fee: TxFeeDetail[];
  feeUsd: number;
  amountRestriction: TxAmountRestriction;
  estimatedTimeInSeconds: number;
  path: TxPath[];
}

export interface TxSwapper {
  id: string;
  title: string;
  logo: string;
  swapperGroup: string;
  types: string[];
  enabled: boolean;
}

export interface TxAssetDetail {
  blockchain: string;
  symbol: string;
  name: string;
  isPopular: boolean;
  chainId: string;
  address: string;
  decimals: number;
  image: string;
  blockchainImage: string;
  usdPrice: number;
  supportedSwappers: string[];
}

export interface TxFeeDetail {
  token: TxAssetDetail;
  expenseType: string;
  amount: number;
  name: string;
  meta: TxFeeMeta;
}

export interface TxFeeMeta {
  type: string;
  gasLimit: number;
  gasPrice: number;
}

export interface TxAmountRestriction {
  min: number;
  max: number;
  type: string;
}

export interface TxPath {
  swapper: TxSwapper;
  swapperType: string;
  from: TxAssetDetail;
  to: TxAssetDetail;
  inputAmount: number;
  expectedOutput: number;
  estimatedTimeInSeconds: number;
}
