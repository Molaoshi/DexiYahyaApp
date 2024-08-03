import SwapSourcePopup from "../exchange-card/swap-source-popup";
import { Input } from "@/components/ui/input";
import { Blockchain } from "@/app/types/interface";
import { updateTokenValue } from "@/redux/slice/tokenSLice";
import { useAppDispatch, useAppSelector } from "@/redux/provider";
import { useAccount } from "wagmi";

interface Props {
  label: string;
  blockchains: Blockchain[];
  isFromToken?: boolean;
}

const CustomCryptoField: React.FC<Props> = ({
  label,
  blockchains,
  isFromToken = false,
}) => {
  const dispatch = useAppDispatch();
  const account = useAccount();
  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);
  const selectedToken = useAppSelector((state) =>
    isFromToken ? state?.tokens?.fromToken : state?.tokens?.toToken
  );
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-lg mb-1">{label}</label>

        {account.isConnected && isFromToken && (
          <label>Balance: 8942.91 BNB</label>
        )}
      </div>
      <div className="flex items-center bg-[#000]/30  backdrop-filter backdrop-blur-lg border border-[#695F5F] border-opacity-40 rounded-lg p-2 shadow-md max-h-[3.3125rem]">
        <Input
          type="number"
          value={
            isFromToken
              ? selectedToken.value
              : selectedRoute != undefined
              ? Number.parseFloat(selectedRoute.outputAmount).toFixed(3)
              : 0
          }
          min={1}
          max={42000000}
          onChange={(e) =>
            dispatch(updateTokenValue({ isFromToken, value: e.target.value }))
          }
          placeholder="Please enter 1-42000000"
          className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:outline-0 focus-visible:ring-offset-0"
          style={{ outline: "none" }}
          disabled={!isFromToken || isInProcess || isSwapMade}
        />
        <div className="border-l-2 border-[#ffffff33]">
          <SwapSourcePopup
            blockchains={blockchains}
            isFromToken={isFromToken}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomCryptoField;
