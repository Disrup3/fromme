import { useState } from "react";
import NFTcard from "../components/ui/NFTcard";
import { GetServerSideProps } from "next";
import { prisma } from "~/server/db";
import { Nft } from "@prisma/client";

const Explore = ({ items }: { items: ExploreItem[] }) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

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
    { name: "Bahamas", selected: false },
    { name: "Canada", selected: false },
    { name: "Namibia", selected: false },
    { name: "Portugal", selected: false },
    { name: "Qatar", selected: false },
    { name: "Spain", selected: true },
  ]);

  function handleShowFilters() {
    setShowFilters(!showFilters);
  }

  return (
    <div className="mx-16 flex flex-col md:flex-row w-full gap-0 md:gap-10">
      {/* <!-- Filtros --> */}
      <div className="mx-[5%] md:mr-0 mb-5 md:mb-16 flex flex-col items-center md:gap-2">
        <button
          className="btn-primary rounded px-5 py-2 block md:hidden"
          onClick={handleShowFilters}
        >
          {showFilters ? "Cerrar" : "Mostrar"} filtros
        </button>
        {
          showFilters && (
            <div className="h-min rounded-xl w-full md:w-1/4 min-w-[225px] px-5 py-8 shadow-xl block">
              <div className="flex flex-row md:flex-col justify-around">
                <div className="flex flex-col items-center md:items-start">
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
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <p>Maximum Price</p>
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
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <p>Color</p>
                  {/* <!-- Dropdown Color --> */}
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
                </div>
              </div>
              <div className="flex flex-row md:flex-col justify-around gap-12 md:gap-8 mt-0 md:mt-4">
                <div className="w-full">
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
                </div>
                <div className="w-full">
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
                </div>
              </div>
              <div className="w-full text-center mt-8">
                <button className="btn-primary btn">Reset filters</button>
              </div>
            </div>
          )
        }
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
