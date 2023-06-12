import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  const handleButtonClick = () => {
    window.scroll({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  
  return (
    <div
      style={{
        background: "radial-gradient(circle at -20% -10%, rgba(162, 0, 255, 0.15), transparent 50%), radial-gradient(circle at 75% 80%, rgba(111, 0, 255, 0.15), transparent 30%)",
      }}
      className="flex h-[82vh] mb-[8vh] w-full flex-col items-center justify-center text-center gap-7 relative px-[8vw]"
    >
      <h1 className="text-6xl font-bold"><span className="text-primary">New World </span>of Digital Collectibles</h1>
      <h2 className="text-xl font-semibold">Buy and sell NFTs from the world's top artists</h2>
      <div className="flex justify-center gap-7">
        <button className="rounded-full bg-primary px-7 py-3 text-xs font-semibold text-base-100">
          Start Exploring
        </button>
        <button className="rounded-full px-7 py-3 text-xs font-semibold border-black border-2 text-black">
          Learn More
        </button>
      </div>
      <button onClick={handleButtonClick} className="absolute bottom-[-35px] left-[50%] transform-gpu -translate-x-1/2 bg-white rounded-full w-[70px] h-[70px] flex items-center justify-center shadow-xl p-6">
        <FontAwesomeIcon icon={faAnglesDown}/>
      </button>
    </div>
  );
};
export default HeroSection;