import {
    erc20ABI,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi";
import { nftfactoryContract } from "../contracts";
import { addresses, NFTFactory_abi } from "../constants";
import { formatUnits } from "viem";
    
export default function useNftfactoryContract(
    _tokenURI: string,
    _feeNumerator: bigint = BigInt(0),
    onSuccessfulPurchase: () => void
) {
    /*const { data: allowance, refetch: refetchAllowance } = useContractRead({
        abi: erc20ABI,
        address: addresses.USDC,
        functionName: "allowance",
        args: [address, addresses.AndorraPoker],
    });*/
    
    const { config: approveConfig } = usePrepareContractWrite({
        abi: NFTFactory_abi,
        address: addresses.NFTFactory,
        functionName: "createNFT",
        args: [_tokenURI, _feeNumerator],
    });

    const { write: approveCreate } = useContractWrite({
        ...approveConfig,
        onSuccess: () => {
            console.log("onSuccess del approveCreate!");
          /*7refetchAllowance().catch((e) => {
            console.error(e);
          });
          refetchBalance().catch((e) => {
            console.error(e);
          });
          refetchPrice().catch((e) => {
            console.error(e);
          });*/
        },
      });
    
    /*useWaitForTransaction({
        hash: approveData?.hash,
        onSuccess: () => {
            refetchAllowance().catch((e) => {
                console.error(e);
            });
            refetchBalance().catch((e) => {
                console.error(e);
            });
            refetchPrice().catch((e) => {
                console.error(e);
            });
        },
    });
    
    const insufficientBalance = !!balance && !!price && balance < price;
    
    const priceUSD = Number(formatUnits(price ?? BigInt(0), 6));
    */
    return {
        approveCreate,
    };
}