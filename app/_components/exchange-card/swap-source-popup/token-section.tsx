import Search from "../../common/search";
import Image from "next/image";
import CustomLoader from "../../common/loader";
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { getBlockchainTokens } from "@/app/api/rango-api";
import { Blockchain, RootState, Token } from "@/app/types/interface";
import { toastSuccess } from "@/lib/utils";
import { useSelector } from "react-redux";
import { resetToken, updateToken } from "@/redux/slice/tokenSLice";
import { useAppDispatch } from "@/redux/provider";
import { DialogClose } from "@/components/ui/dialog";
import { resetRoute } from "@/redux/slice/routeSlice";
import { resetSwap } from "@/redux/slice/swapSlice";

const TokenSection: React.FC<{
  selectedBlockchain: Blockchain | null;
  isFromToken: boolean;
}> = ({ selectedBlockchain, isFromToken }) => {
  const dispatch = useAppDispatch();

  const storedToken: Token = useSelector((state: RootState) =>
    isFromToken ? state?.tokens?.fromToken : state?.tokens?.toToken
  );

  const [tokenData, setTokenData] = useState<Token[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const filteredTokens = tokenData.filter((tok) =>
    tok.name != null
      ? tok.name.toLowerCase().includes(search.toLowerCase())
      : false
  );

  useEffect(() => {
    if (selectedBlockchain != null) {
      setLoading(true);
      getBlockchainTokens(selectedBlockchain!.name).then((tokens) => {
        setTokenData(tokens);
        setLoading(false);
      });
    }
  }, [selectedBlockchain]);

  const tokenTemplate = (
    id: string,
    name: string,
    imageSrc: string,
    status: boolean = false,
    index: number
  ) => (
    <DialogClose
      className={`mb-2.5 px-3.5 py-3 border rounded-3xl w-full cursor-pointer bg-transparent hover:bg-white/5 transition-colors duration-300 ${
        status ? "border-primary" : "border-seperator"
      }`}
      onClick={() => {
        if (!status) {
          const tempSelectedToken = tokenData.filter(
            (tok) => tok.address == id
          )[0];

          dispatch(
            updateToken({
              token: tempSelectedToken,
              isFromToken,
            })
          );
          dispatch(resetRoute());
          dispatch(resetSwap());

          toastSuccess(`${tempSelectedToken.name}'s selected as token`);
        } else dispatch(resetToken({ isFromToken }));
      }}
      key={`${id}-${name}-${index}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-6 capitalize">
          <Image
            src={imageSrc}
            height={57}
            width={57}
            alt="Token Icon"
            className="text-sm"
          />

          {name}
        </div>

        {status ? (
          <Check className="w-[1.375rem] h-[1.375rem] p-0.5 bg-primary rounded-full font-bold text-black" />
        ) : (
          <div className="w-[1.375rem] h-[1.375rem] border rounded-full" />
        )}
      </div>
    </DialogClose>
  );

  return loading ? (
    <CustomLoader />
  ) : (
    <section>
      <h1 className="capitalize text-base sm:text-lg mb-6">select token</h1>
      {selectedBlockchain == null ? (
        <div>Select blockchain first!</div>
      ) : (
        <>
          <Search search={search} setSearch={setSearch} />

          <div className="pe-2.5 max-h-[20vh] overflow-y-auto">
            {filteredTokens.map((token, index) =>
              tokenTemplate(
                token.address,
                token.name,
                token.image,
                storedToken?.address === token.address,
                index
              )
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default TokenSection;
