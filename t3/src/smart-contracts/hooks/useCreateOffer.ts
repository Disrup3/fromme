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

export default function useCreateOffer({
  _tokenId,

  _durationInSeconds,
  onSuccessfulCreateOffer,
}: {
  _tokenId: bigint;
  _durationInSeconds: bigint;
  onSuccessfulCreateOffer: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { config: createOfferConfig } = usePrepareContractWrite({
    abi: NFTFactory_abi,
    address: addresses.NFTFactory,
    functionName: "createOffer",
    args: [_tokenId, _durationInSeconds],
  });

  const {
    write: createOfferWrite,
    data: createOfferData,
  } = useContractWrite({
    ...createOfferConfig,
    onError: () => {
      toast.error("Transaction cancelled");
      setIsLoading(false);
    },
  });

  useWaitForTransaction({
    hash: createOfferData?.hash,
    onSuccess: () => {
      toast.success("NFT listed successfully!");
      setIsLoading(false);
      onSuccessfulCreateOffer();
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsLoading(false);
    },
  });

  return {
    write: createOfferWrite,
    changeIsLoading: setIsLoading,
    isLoading: isLoading,
  };
}
