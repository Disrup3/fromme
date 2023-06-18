import {
    // erc20ABI,
    // useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi";
import { addresses, NFTFactory_abi } from "../constants";

export default function useNftfactoryContract({
    _tokenURI,
    _feeNumerator,
    onSuccessfulCreateNFT,
}: {
    _tokenURI: string,
    _feeNumerator: bigint,
    onSuccessfulCreateNFT: () => void,
}) {
    const { config: createNFTconfig } = usePrepareContractWrite({
        abi: NFTFactory_abi,
        address: addresses.NFTFactory,
        functionName: "createNFT",
        args: [_tokenURI, _feeNumerator],
    });

    const {
        write: createNFT,
        isLoading: createNFTisLoading,
        data: createNFTdata,
    } = useContractWrite({
        ...createNFTconfig,
    });

    useWaitForTransaction({
        hash: createNFTdata?.hash,
        onSuccess: () => {
            onSuccessfulCreateNFT();
        },
    });

    return {
        write: createNFT,
    };
}