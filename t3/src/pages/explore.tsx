import { useState } from "react";
import NFTcard from "../components/ui/NFTcard";
import { GetServerSideProps } from "next";
import { prisma } from "~/server/db";
import { Nft } from "@prisma/client";

const Explore = ({ items }: { items: ExploreItem[] }) => {
 
  // Simular datos recibidos de la API
  const [categoriesSelected, setCategoriesSelected] = useState<selectable[]>([
    { name: "Photography", selected: true },
    { name: "Music", selected: false },
    { name: "Audio", selected: true },
    { name: "Poetry", selected: false },
    { name: "Video", selected: false },
    { name: "Illustration", selected: false },
  ]);
  // Simular datos recibidos de la API
  const [originSelected, setOriginSelected] = useState<selectable[]>([
    { name: "Afghanistan", selected: false },
    { name: "Bahamas", selected: false },
    { name: "Canada", selected: false },
    { name: "Namibia", selected: false },
    { name: "Portugal", selected: false },
    { name: "Qatar", selected: false },
    { name: "Spain", selected: true },
  ]);

  return (
    <div className="mx-16 flex w-full gap-10">
      {/* <!-- Filtros --> */}
      <div className="hidden h-min w-1/4 rounded-xl px-4 py-8 shadow-xl md:block">
        <p>Type</p>
        {/* <!-- Dropdown Type --> */}
        <details className="dropdown mb-5">
          <summary className="btn m-1 rounded-md border-[1px] border-primary bg-white">
            Choose type
          </summary>
          <ul className="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
            <li>
              <a>Any type</a>
            </li>
            <li>
              <a>Bid</a>
            </li>
          </ul>
        </details>
        <p>Maximum Price</p>
        <p>Like</p>
        {/* <!-- Dropdown Like --> */}
        <details className="dropdown mb-5">
          <summary className="btn m-1 rounded-md border-[1px] border-primary bg-white">
            Choose like
          </summary>
          <ul className="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
            <li>
              <a>Most liked</a>
            </li>
            <li>
              <a>Least liked</a>
            </li>
          </ul>
        </details>
        <p>Color</p>
        {/* <!-- Dropdown Like --> */}
        <details className="dropdown mb-5">
          <summary className="btn m-1 rounded-md border-[1px] border-primary bg-white">
            Choose color
          </summary>
          <ul className="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
            <li>
              <a>Any color</a>
            </li>
            <li>
              <a>Black</a>
            </li>
            <li>
              <a>White</a>
            </li>
            <li>
              <a>Red</a>
            </li>
            <li>
              <a>Orange</a>
            </li>
            <li>
              <a>Yellow</a>
            </li>
            <li>
              <a>Green</a>
            </li>
            <li>
              <a>Blue</a>
            </li>
            <li>
              <a>Purple</a>
            </li>
            <li>
              <a>Pink</a>
            </li>
          </ul>
        </details>
        {/* <!-- Checkboxes categories --> */}
        <p>Category</p>
        {categoriesSelected.map((category, index) => (
          <div className="form-control" key={index}>
            <label className="label cursor-pointer">
              <span className="label-text">{category.name}</span>
              <input
                type="checkbox"
                checked={category.selected}
                className="checkbox-primary checkbox"
              />
            </label>
          </div>
        ))}
        {/* <!-- Checkboxes origin --> */}
        <p>Origin</p>
        {originSelected.map((category, index) => (
          <div className="form-control" key={index}>
            <label className="label cursor-pointer">
              <span className="label-text">{category.name}</span>
              <input
                type="checkbox"
                checked={category.selected}
                className="checkbox-primary checkbox"
              />
            </label>
          </div>
        ))}
        <button className="btn-primary btn">Reset filters</button>
      </div>
      <div className="flex flex-wrap justify-center gap-5 p-8">
        {items?.map((item: ExploreItem, index: number) => {
          // console.log('explore ::::', index, item)
          return <NFTcard key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const nfts = await prisma.nft.findMany({});
  const items = nfts.filter((nft: Nft) => nft.tokenId >= 10); // test version - delete the nfts that have incorrect IPFS token Uri

  return {
    props: { items },
  };
};
export default Explore;
