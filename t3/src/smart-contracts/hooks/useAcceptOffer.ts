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

export default function useAcceptOffer({
  _tokenId,
  onSuccessfulAcceptOffer,
}: {
  _tokenId: bigint;
  onSuccessfulAcceptOffer: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { config: acceptOfferConfig } = usePrepareContractWrite({
    abi: NFTFactory_abi,
    address: addresses.NFTFactory,
    functionName: "acceptOffer",
    args: [_tokenId],
  });

  const {
    write: acceptOfferWrite,
    data: acceptOfferData,
    error: acceptOfferError,
  } = useContractWrite({
    ...acceptOfferConfig,
    onError: () => {
      toast.error("Transaction cancelled");
      setIsLoading(false);
    },
  });

  useWaitForTransaction({
    hash: acceptOfferData?.hash,
    onSuccess: () => {
      toast.success("Offer accepted successfully!");
      setIsLoading(false);
      onSuccessfulAcceptOffer();
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsLoading(false);
    },
  });

  return {
    write: acceptOfferWrite,
    changeIsLoading: setIsLoading,
    isLoading: isLoading,
  };
}
