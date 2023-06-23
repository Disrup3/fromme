import { useState } from "react";
import NFTcard from "../components/ui/NFTcard";

const explore = () => {

  // Simular datos recibidos de la API
  const [items, setItems] = useState<ExploreItem[]>([
    { image: "images/carousel-test/1.png", title: "The Coldest Sunset", creator: "Pablo González", favorites: 3, "stock": 1, "price": 10 },
    { image: "images/carousel-test/2.png", title: "Another sunset", creator: "Alexfu", favorites: 1, "stock": 1, "price": 25 },
    { image: "images/carousel-test/3.png", title: "Aperitivo Italiano", creator: "Daniel Calvo", favorites: 0, "stock": 1, "price": 8 },
    { image: "images/carousel-test/4.png", title: "Tortuga en ruta", creator: "Pablo González", favorites: 12, "stock": 1, "price": 7.5 },
    { image: "images/carousel-test/5.png", title: "Soundtrack testing", creator: "Alexfu", favorites: 165, "stock": 1, "price": 87 },
  ]);
  
  return (
    <div className="flex gap-10 mx-16">
      {/* <!-- Filtros --> */}
      <div className="w-1/4 rounded-xl overflow-hidden shadow-lg hidden md:block p-4 mb-10">
        <p>Type</p>
        {/* <!-- Dropdown Type --> */}
        <details className="dropdown mb-32">
          <summary className="m-1 btn bg-white border-primary border-[1px] rounded-md">Choose type</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li><a>Any type</a></li>
            <li><a>Bid</a></li>
          </ul>
        </details>
        <p>Maximum Price</p>
      </div>
      <div className="flex flex-wrap w-full justify-around gap-[1vw]">
      {
        items.map((item, key) => (
          <NFTcard
            key={key}
            item={item}
          />
        ))
      }
      </div>
    </div>
  );
};
export default explore;