import Image from "next/image";
import { LuEdit } from "react-icons/lu";
// TODO: Decidir diseño mas detallado, el border queda un poco feo
// TODO: Reemplazar

const UserProfile = () => {
  const nfts = [
    {
      id: 1,
      name: "Atlas",
      src: "/images/test.jpg",
    },
    {
      id: 2,
      name: "Atlas",
      src: "/images/carousel-test/1.png",
    },
    {
      id: 1,
      name: "Atlas",
      src: "/images/carousel-test/2.png",
    },
  ];
  return (
    <div
      className=" w-5/6  rounded-2xl border border-primary"
      style={{
        background:
          "radial-gradient(circle at -20% -10%, rgba(162, 0, 255, 0.3), transparent 40%), radial-gradient(circle at 75% 30%, rgba(111, 0, 255, 0.15), transparent 80%)",
      }}
    >
      <div className="relative top-[75px] flex cursor-pointer justify-end px-2 text-primary">
        <LuEdit size={30} />
      </div>
      <hr className="relative top-20 border border-primary" />
      <div className="flex flex-col items-center ">
        <div className="relative top-[40px] flex w-fit flex-col items-center">
          <Image
            className="rounded-full border-2 border-primary"
            alt="User profile picture"
            src="/images/test.jpg"
            width={80}
            height={80}
          />
        </div>
        <div className="mt-10 text-center text-xs sm:text-sm md:text-base">
          <p className="font-semibold">TEST USER</p>
          <p>Total earned: {nfts.length}</p>
          <p>Last sale: {nfts.length}</p>
        </div>
        <div className="my-5 flex flex-wrap justify-center gap-3 p-2">
          {nfts?.map((nft, i) => (
            <Image
              key={i}
              src={nft.src}
              alt="User`s NFT"
              width={150}
              height={100}
              className=" min-h-[200px] rounded-xl object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
