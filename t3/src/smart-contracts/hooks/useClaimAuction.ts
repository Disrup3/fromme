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

export default function useClaimAuction({
  _tokenId,
  onSuccessfulClaimAuction,
}: {
  _tokenId: bigint;
  onSuccessfulClaimAuction: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { config: claimAuctionConfig } = usePrepareContractWrite({
    abi: NFTFactory_abi,
    address: addresses.NFTFactory,
    functionName: "claimAuction",
    args: [_tokenId],
  });

  const {
    write: claimAuctionWrite,
    data: claimAuctionData,
  } = useContractWrite({
    ...claimAuctionConfig,
    onError: () => {
      toast.error("Transaction cancelled");
      setIsLoading(false);
    },
  });

  useWaitForTransaction({
    hash: claimAuctionData?.hash,
    onSuccess: () => {
      toast.success("Auction claimed successfully!");
      setIsLoading(false);
      onSuccessfulClaimAuction();
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsLoading(false);
    },
  });

  return {
    write: claimAuctionWrite,
    changeIsLoading: setIsLoading,
    isLoading: isLoading,
  };
}
