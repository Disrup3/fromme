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

export default function useListItem({
  _tokenId,
  _amount,
  _durationInSeconds,
  onSuccessfulListItem,
}: {
  _tokenId: number;
  _amount: number;
  _durationInSeconds: number;
  onSuccessfulListItem: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { config: listItemConfig } = usePrepareContractWrite({
    abi: NFTFactory_abi,
    address: addresses.NFTFactory,
    functionName: "listItem",
    args: [_tokenId, _amount, _durationInSeconds],
  });

  const {
    write: listItemWrite,
    data: listItemData,
  } = useContractWrite({
    ...listItemConfig,
    onError: () => {
      toast.error("Transaction cancelled");
      setIsLoading(false);
    },
  });

  useWaitForTransaction({
    hash: listItemData?.hash,
    onSuccess: () => {
      toast.success("NFT listed successfully!");
      setIsLoading(false);
      onSuccessfulListItem();
    },
    onError: () => {
      toast.error("Something went wrong");
      setIsLoading(false);
    },
  });

  return {
    write: listItemWrite,
    changeIsLoading: setIsLoading,
    isLoading: isLoading,
  };
}
