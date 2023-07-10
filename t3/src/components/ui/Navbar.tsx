import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsTranslate } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  console.log(showMobileNav);
  return (
    <>
      <div className="flex h-24 items-center justify-between border-black px-10">
        <div className="flex items-center gap-16">
          {/* LOGO */}
          <Link href={"/"}>
            <Image
              src={"/images/logo-mobile.svg"}
              width={100}
              height={100}
              alt="Logo Fromme"
              className="cursor-pointer"
            />
          </Link>
          <div className="hidden gap-5 md:flex md:text-xs lg:text-base">
            {/* TODO: Actualizar estos enlaces, de haberlos */}
            <Link
              href={"/explore"}
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
        {/* TODO: Añadir idiomas al menu movil....o no */}
        {showMobileNav ? (
          <>
            <MdClose
              onClick={() => setShowMobileNav(false)}
              size={40}
              className="z-50 cursor-pointer text-primary duration-200 hover:scale-125 hover:text-slate-400 md:hidden"
            />
            <div className="absolute left-0 top-0 z-30 flex h-full w-screen flex-col items-center justify-center gap-6 bg-black bg-opacity-95 text-3xl font-bold text-primary md:hidden">
              <div className="text-lg">
                <ConnectButton label="Conectar Cartera" />
              </div>
              <Link
                href={"/collections"}
                className="duration-200 hover:text-slate-400"
              >
                Collections
              </Link>
              <Link
                href={"/how-it-works"}
                className="duration-200 hover:text-slate-400"
              >
                How It Works
              </Link>
              <Link
                href={"/news"}
                className="duration-200 hover:text-slate-400"
              >
                News
              </Link>
              <hr className="w-2/5 border border-primary" />
              <Link
                href={"/create"}
                className="duration-200 hover:text-slate-400"
              >
                Upload
              </Link>
            </div>
          </>
        ) : (
          <FiMenu
            onClick={() => setShowMobileNav(true)}
            className="cursor-pointer text-4xl font-bold duration-200 hover:scale-105 hover:text-primary md:hidden"
          />
        )}
        <div className="hidden items-center gap-3 font-semibold md:flex md:text-xs lg:text-base">
          <button className="rounded-full border-2 border-secondary p-3 duration-700 hover:border-primary hover:bg-primary hover:text-base-100">
            <BsTranslate />
          </button>
          <Link
            href={"/create"}
            className="rounded-full border-2 border-2 border-primary bg-primary px-4 py-2 text-base-100"
          >
            Upload
          </Link>
          <div>
            <ConnectButton
              label="Conectar Cartera"
              accountStatus={"full"}
              chainStatus={"none"}
              showBalance={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
