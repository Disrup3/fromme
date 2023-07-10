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

export default function useCreateAuction({
  _tokenId,
  _startingAmount,
  _durationInSeconds,
  onSuccessfulCreateAuction,
}: {
  _tokenId: bigint;
  _startingAmount: bigint;
  _durationInSeconds: bigint;
  onSuccessfulCreateAuction: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { config: createAuctionConfig } = usePrepareContractWrite({
    abi: NFTFactory_abi,
    address: addresses.NFTFactory,
    functionName: "createAuction",
    args: [_tokenId, _startingAmount, _durationInSeconds],
  });

  const {
    write: createAuctionWrite,
    data: createAuctionData,
    error: createAuctionError,
  } = useContractWrite({
    ...createAuctionConfig,
    onError: () => {
      toast.error("Transaction cancelled");
      setIsLoading(false);
    },
  });

  useWaitForTransaction({
    hash: createAuctionData?.hash,
    onSuccess: () => {
      toast.success("Auction created successfully!");
      setIsLoading(false);
      onSuccessfulCreateAuction();
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsLoading(false);
    },
  });

  return {
    write: createAuctionWrite,
    changeIsLoading: setIsLoading,
    isLoading: isLoading,
  };
}
