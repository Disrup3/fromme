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

export default function useAddBidAmount({
  _tokenId,
  onSuccessfulAddBidAmount,
}: {
  _tokenId: bigint;
  onSuccessfulAddBidAmount: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { config: addBidAmountConfig } = usePrepareContractWrite({
    abi: NFTFactory_abi,
    address: addresses.NFTFactory,
    functionName: "addBidAmount",
    args: [_tokenId],
  });

  const {
    write: addBidAmountWrite,
    data: addBidAmountData,
  } = useContractWrite({
    ...addBidAmountConfig,
    onError: () => {
      toast.error("Transaction cancelled");
      setIsLoading(false);
    },
  });

  useWaitForTransaction({
    hash: addBidAmountData?.hash,
    onSuccess: () => {
      toast.success("Bid created successfully!");
      setIsLoading(false);
      onSuccessfulAddBidAmount();
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsLoading(false);
    },
  });

  return {
    write: addBidAmountWrite,
    changeIsLoading: setIsLoading,
    isLoading: isLoading,
  };
}
