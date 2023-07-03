import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";

const NFTProduct = () => {
  return (
    <div className="flex w-full justify-evenly p-6">
      <div className="flex w-1/3 flex-col gap-5">
        <h2 className="text-3xl font-bold">TEst1</h2>
        <hr />
        <div className="flex items-center justify-between">
          <div className="flex gap-4 font-semibold text-gray-400">
            <p>Views: {4}</p>
            <p>Sell: {0} Times</p>
          </div>
          <div className="flex items-center gap-1 font-bold">
            <AiOutlineHeart className="text-accent" />0
          </div>
        </div>

        <div className="flex flex-col gap-7 rounded-lg border p-6">
          <div className="flex flex-col items-start">
            <p className="font-semibold">Address:</p>
            <p>sdasdasdasdasdas</p>
            <p className="font-semibold">Price</p>
            <p className="text-3xl font-bold">
              {0.0}
              <span className="text-base">EUR</span>
            </p>
          </div>
          <hr />
          <div className="flex justify-start">
            <div className="flex flex-col items-center font-semibold">
              <div className="h-12 w-12 rounded-full bg-orange-400">
                {/* TODO: Modificar */}
                {/* <Image
                src={""}
                width={30}
                height={30}
                alt="Creator`s profile image"
              /> */}
              </div>
              <p className="text-base">{`Ricard Marti`}</p>
              <p className="text-sm text-gray-400">Creator</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
          <button className="w-full rounded-full bg-primary py-2 font-semibold text-base-100">
            Purchase
          </button>
          <p className="font-semibold text-gray-400">
            Transfer History{" "}
            <Link href={"#"} className="text-secondary">
              Click Here
            </Link>
          </p>
        </div>
      </div>
      <div className="h-[450px] w-1/3 rounded-lg bg-test bg-cover bg-center">
        <div className="relative -left-12 top-8 w-fit rounded-full bg-accent px-4 py-1 font-semibold text-base-100">
          Music
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //const { data } = await  // your fetch function here
  // OBTENER DE LA BASE DE DATOS EL NFT POR TOKEN ID
  // EL TOKEN ID SE OBTIENE DEL REQ.QUERY
  // SI EL TOKEN ID NO EXISTE REDIRIGIR A 404

  // OBTENER DATOS DEL VENDEDOR ( SI EXISTE EN BD)

  // CHECKEAR SI EL NFT ESTÁ LISTADO, PARA COMPROBAR ESO TRAER LOS LISTINGS PARA ESE TOKENID
  // Y CHECKEAR SI EL TIEMPO LIMITE ES INFERIOR AL TIEMPO ACTUAL
  // RETORNAR DATOS

  return {
    props: {
      something: {},
    },
  };
};
export default NFTProduct;
