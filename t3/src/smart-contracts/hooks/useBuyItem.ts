import {
  // erc20ABI,
  // useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { addresses, NFTFactory_abi } from "../constants";
import toast from "react-hot-toast";
import { useState } from "react";

export default function useBuyItem({
  _tokenId,
  onSuccessfulBuyItem,
}: {
  _tokenId: bigint;
  onSuccessfulBuyItem: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { config: buyItemConfig } = usePrepareContractWrite({
    abi: NFTFactory_abi,
    address: addresses.NFTFactory,
    functionName: "buyItem",
    args: [_tokenId],
  });

  const {
    write: buyItemWrite,
    data: buyItemData,
  } = useContractWrite({
    ...buyItemConfig,
    onError: () => {
      toast.error("Transaction cancelled");
      setIsLoading(false);
    },
  });

  useWaitForTransaction({
    hash: buyItemData?.hash,
    onSuccess: () => {
      toast.success("NFT bought successfully!");
      setIsLoading(false);
      onSuccessfulBuyItem();
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsLoading(false);
    },
  });

  return {
    write: buyItemWrite,
    changeIsLoading: setIsLoading,
    isLoading: isLoading,
  };
}
