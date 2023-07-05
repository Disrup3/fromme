import {
    // erc20ABI,
    // useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi";
import { addresses, NFTFactory_abi } from "../constants";
import toast from 'react-hot-toast';
import { useState } from "react";

export default function useNftfactoryContract({
    _tokenURI,
    _feeNumerator,
    onSuccessfulCreateNFT,
}: {
    _tokenURI: string,
    _feeNumerator: bigint,
    onSuccessfulCreateNFT: () => void,
}) {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { config: createNFTconfig } = usePrepareContractWrite({
        abi: NFTFactory_abi,
        address: addresses.NFTFactory,
        functionName: "createNFT",
        args: [_tokenURI, _feeNumerator],        
    });

    console.log(_tokenURI)

    const {
        write: createNFT,
        data: createNFTdata,
        error: createNFTerror,
    } = useContractWrite({
        ...createNFTconfig,
        onError: () => {
            toast.error('Transaction cancelled');
            setIsLoading(false);
        },
    });

    useWaitForTransaction({
        hash: createNFTdata?.hash,
        onSuccess: () => {
            toast.success('NFT created successfully!');
            setIsLoading(false);
            onSuccessfulCreateNFT();
        },
        onError: () => {
            toast.error('Something went wrong');
            setIsLoading(false);
        },
    });

    return {
        write: createNFT,
        changeIsLoading: setIsLoading,
        isLoading: isLoading,
    };
}