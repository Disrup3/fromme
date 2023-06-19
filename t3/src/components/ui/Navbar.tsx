import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { BsTranslate } from "react-icons/bs";
import { RxMagnifyingGlass } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className="flex h-24 justify-between border-black px-10">
      <div className="flex items-center gap-16">
        <Link href={"/"}>
          <Image
            src={"/images/logo-mobile.svg"}
            width={100}
            height={100}
            alt="Logo Fromme"
            className="cursor-pointer"
          />
        </Link>
        <div className="flex gap-5">
          {/* TODO: Actualizar estos enlaces, de haberlos */}
          <Link
            href={"/collections"}
            className="duration-700 hover:text-slate-400"
          >
            Collections
          </Link>
          <Link
            href={"/how-it-works"}
            className="duration-700 hover:text-slate-400"
          >
            How It Works
          </Link>
          <Link href={"/news"} className="duration-700 hover:text-slate-400">
            News
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-3 font-semibold">
        <button className="rounded-full border-2 border-secondary p-3 duration-700 hover:border-primary hover:bg-primary hover:text-base-100">
          <BsTranslate />
        </button>
        <Link
          href={"/create"}
          className="rounded-full border-2 border-2 border-primary bg-primary px-4 py-2 text-base-100"
        >
          Upload
        </Link>
        <button className="rounded-full border-2 border-black px-4 py-2 duration-700 hover:border-base-100">
          Conetar Cartera
        </button>
      </div>
    </div>
  );
};
export default Navbar;
