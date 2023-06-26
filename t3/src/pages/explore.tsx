import { useState } from "react";
import NFTcard from "../components/ui/NFTcard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const explore = () => {

  // Simular datos recibidos de la API
  const [items, setItems] = useState<ExploreItem[]>([
    { image: "images/carousel-test/1.png", title: "The Coldest Sunset", creator: "Pablo González", favorites: 3, "stock": 1, "price": 10 },
    { image: "images/carousel-test/2.png", title: "Another sunset", creator: "Alexfu", favorites: 1, "stock": 1, "price": 25 },
    { image: "images/carousel-test/3.png", title: "Aperitivo Italiano", creator: "Daniel Calvo", favorites: 0, "stock": 1, "price": 8 },
    { image: "images/carousel-test/4.png", title: "Tortuga en ruta", creator: "Pablo González", favorites: 12, "stock": 1, "price": 7.5 },
    { image: "images/carousel-test/5.png", title: "Soundtrack testing", creator: "Alexfu", favorites: 165, "stock": 1, "price": 87 },
  ]);
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
    <div className="flex gap-10 mx-16">
      {/* <!-- Filtros --> */}
      <div className="w-1/4 h-min rounded-xl shadow-xl hidden md:block px-4 py-8">
        <p>Type</p>
        {/* <!-- Dropdown Type --> */}
        <details className="dropdown mb-5">
          <summary className="m-1 btn bg-white border-primary border-[1px] rounded-md">Choose type</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li><a>Any type</a></li>
            <li><a>Bid</a></li>
          </ul>
        </details>
        <p>Maximum Price</p>
        <p>Like</p>
        {/* <!-- Dropdown Like --> */}
        <details className="dropdown mb-5">
          <summary className="m-1 btn bg-white border-primary border-[1px] rounded-md">Choose like</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li><a>Most liked</a></li>
            <li><a>Least liked</a></li>
          </ul>
        </details>
        <p>Color</p>
        {/* <!-- Dropdown Like --> */}
        <details className="dropdown mb-5">
          <summary className="m-1 btn bg-white border-primary border-[1px] rounded-md">Choose color</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li><a>Any color</a></li>
            <li><a>Black</a></li>
            <li><a>White</a></li>
            <li><a>Red</a></li>
            <li><a>Orange</a></li>
            <li><a>Yellow</a></li>
            <li><a>Green</a></li>
            <li><a>Blue</a></li>
            <li><a>Purple</a></li>
            <li><a>Pink</a></li>
          </ul>
        </details>
        {/* <!-- Checkboxes categories --> */}
        <p>Category</p>
        {
          categoriesSelected.map((category, index) => (
            <div className="form-control" key={index} onClick={() => {}} >
              <label className="label cursor-pointer">
                <span className="label-text">{category.name}</span> 
                <input
                  type="checkbox"
                  checked={category.selected}
                  className="checkbox checkbox-primary"
                  onChange={() => {}}
                  />
              </label>
            </div>
          ))
        }
        {/* <!-- Checkboxes origin --> */}
        <p>Origin</p>
        {
          originSelected.map((category, index) => (
            <div className="form-control" key={index} onClick={() => {}} >
              <label className="label cursor-pointer">
                <span className="label-text">{category.name}</span> 
                <input
                  type="checkbox"
                  checked={category.selected}
                  className="checkbox checkbox-primary"
                  onChange={() => {}}
                />
              </label>
            </div>
          ))
        }
        <button className="btn btn-primary">Reset filters</button>
      </div>
      <div className="flex flex-wrap w-full justify-around gap-[1vw]">
      {
        items.map((item, index) => (
          <NFTcard
            key={index}
            item={item}
          />
        ))
      }
      </div>
    </div>
  );
};
export default explore;