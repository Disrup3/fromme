import React, { useState, useEffect, FC } from 'react';

interface Props {
  items: CarouselItem[];
}

const Carousel: FC<Props> = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayingItems, setDisplayingItems] = useState([items[0], items[1], items[2]]);

  const handleClickNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === items.length - 1 ? 0 : prevSlide + 1));
    chooseItems();
  };

  const handleClickPrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? items.length - 1 : prevSlide - 1));
    chooseItems();
  };

  const chooseItems = () => {
    if(items.length == 0) {
      setDisplayingItems([]);
    } else if(currentSlide > items.length - 2) {
      setDisplayingItems([items[currentSlide], items[0], items[1]]);
    } else if(currentSlide > items.length - 3) {
      setDisplayingItems([items[currentSlide], items[currentSlide + 1], items[0]]);
    } else {
      setDisplayingItems([items[currentSlide], items[currentSlide + 1], items[currentSlide + 2]]);
    }
  };

  useEffect(() => {
    let timer = setTimeout(handleClickNext, 10000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="flex justify-center items-center">
      <button className="mr-2 border border-gray-400 rounded-full w-[30px] h-[30px]" onClick={handleClickPrev}>❮</button>
      <div className="flex items-start w-5/6">
        {displayingItems.map((item, key) => (
          <div key={key} className="flex flex-col w-1/3 rounded-md m-2 items-center justify-center">
            <img src={item!.image} alt={item!.title} className="rounded-lg"/>
            <div className="p-4 w-full">
              <p className="font-bold">{item!.title}</p>
              <div className="flex flex-wrap justify-between items w-full">
                <button>{item!.creator}</button>
                <button className="border rounded px-2 py-1">
                  <p>1 item</p>
                </button>
              </div>
              <div className="divider"></div>
              <p className="font-bold">Price</p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">{item!.precio.toFixed(2)} <span className="text-lg">EUR</span></p>
            </div>
          </div>
        ))}
      </div>
      <button className="ml-2 border border-gray-400 rounded-full w-[30px] h-[30px]" onClick={handleClickNext}>❯</button>
    </div>
  );
};

export default Carousel;