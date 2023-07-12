import { AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import shortenAddress from "../../utils/shortenAddress";

const NFTcard = ({ item }: { item: ExploreItem }) => {
  const [tokenId, setTokenId] = useState<number>();
  const [tokenUri, setTokenUri] = useState<string>("");
  const [tokenName, setTokenName] = useState<string>();
  const [tokenDescription, setTokenDescription] = useState<string>();

  useEffect(() => {
    const getIPFSMetadata = async () => {
      setTokenId(item.tokenId);

      try {
        const _tokenUri = item.tokenUri;
        const _formattedTokenUri = formatTokenUri(_tokenUri);
        const metadataIPFS = await axios.get<{
          image: string;
          name: string;
          description: string;
        }>(_formattedTokenUri);

        setTokenUri(metadataIPFS.data.image);
        setTokenName(metadataIPFS.data.name);
        setTokenDescription(metadataIPFS.data.description);
      } catch {
        console.log("Invalid IPFS metadata");
      }
    };
    getIPFSMetadata()
      .then(() => console.log("meow"))
      .catch(() => console.log("err"));
  }, []);

  function formatTokenUri(_tokenUri: string) {
    const formattedTokenUri = `https://ipfs.io/ipfs/${_tokenUri?.substring(
      7,
      200
    )}`;
    return formattedTokenUri;
  }

  const formattedTokenUri = `https://ipfs.io/ipfs/${tokenUri?.substring(
    7,
    200
  )}`;
  const formattedTokenName = String(tokenName);
  const formattedTokenDescription = String(tokenDescription);
  return (
    <div className="group flex h-fit flex-col items-center gap-2 rounded-xl shadow-md shadow-primary">
      {/* DIV PARA EL INFO EN HOVER */}
      <div className="absolute z-10 hidden w-[250px] flex-col gap-16 p-6 group-hover:flex">
        <div className="flex w-full items-center justify-between">
          <p className="rounded-full bg-primary px-4 py-2 text-base-100">
            {/*Reponer toFixed*/}
            {item.amount} EUR
          </p>
          <p className="cursor-pointer rounded-full bg-base-100 p-3 hover:text-primary">
            <AiFillHeart />
          </p>
        </div>
        <button className="rounded-full bg-primary  py-2 text-base-100 hover:bg-base-100 hover:text-primary">
          <Link
            href={`/product/${tokenId ?? ""}`}
            className="duration-700 hover:text-slate-400"
          >
            Details
          </Link>
        </button>
      </div>
      <div className="flex h-72 justify-center overflow-hidden rounded-lg">
        <Image
          src={formattedTokenUri}
          alt={formattedTokenName}
          width={250}
          height={250}
          className="object-cover duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex w-full flex-col items-start gap-3 p-3">
        <h2 className="text-xl font-semibold">{formattedTokenName}</h2>
        <div className="flex justify-start gap-2">
          <Image
            src="/images/test.jpg"
            width={25}
            height={25}
            alt={``}
            className="rounded-full"
          />
          {/*Reponer getInitials*/}
          <p className="font-semibold">{shortenAddress(item.creator)}</p>
        </div>
        <p>{item.stock} in stock</p>
      </div>
    </div>
  );
};
export default NFTcard;
