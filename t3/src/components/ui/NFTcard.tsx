import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, FC } from "react";
import { getInitials } from "~/utils/ui";

interface Props {
    item: ExploreItem;
}

const heartIconStyle = {
    color: "red",
}

const NFTcard: FC<Props> = ({ item }) => {
    
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div className="container max-w-sm rounded-xl overflow-hidden shadow-lg mb-10
            w-[100%] sm:w-[45%] xl:w-[30%]"
            onMouseOver={ () => setIsHovered(true) }
            onMouseOut={ () => setIsHovered(false) }
        >
            <div className="relative overflow-hidden">
                <img className="" src={item.image} alt={item.title} style={{
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.5s",
                }} />
                {isHovered && (
                    <div className="absolute top-0 left-0 w-full h-full flex flex-wrap justify-center items-center bg-black bg-opacity-50">
                        <div className="flex w-full justify-around items-center">
                            <button className="btn btn-primary">{item.price.toFixed(2)} EUR</button>
                            <button className="bg-white p-5 rounded-full w-8 h-8 flex justify-center items-center">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                        <button className="btn btn-primary">Purchase now</button>
                    </div>
                )}
            </div>
            <div className="px-6 py-4">
                <p className="font-bold text-xl mb-2">{item.title}</p>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <div className="flex justify-center items-center w-6 h-6 bg-blue-400 rounded-full text-center">
                            <p className="text-white text-xs">{getInitials(item.creator)}</p>
                        </div>
                        <p className="text-gray-700 text-base text-ellipsis line-clamp-1">{item.creator}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faHeart} style={heartIconStyle}/>
                        <p>{item.favorites}</p>
                    </div>
                </div>
                <div className="divider h-[1px]"></div>
                <p>{item.stock} in stock</p>
            </div>
        </div>
    );
};
export default NFTcard;