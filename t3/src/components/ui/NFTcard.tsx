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

const imageStyle = {
    backgroundImage: "url('images/carousel-test/1.png')",
    width: "100%",
}

const NFTcard: FC<Props> = ({ item }) => {
    
    const [cardHovered, setCardHovered] = useState<boolean>(false);
    
    const handleMouseOver = () => {
        setCardHovered(true);
    }

    const handleMouseOut = () => {
        setCardHovered(false);
    }

    return (
        <div className="container max-w-sm rounded-xl overflow-hidden shadow-lg mb-10
            w-[100%] sm:w-[45%] xl:w-[30%]"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <div className={`${imageStyle}`}><p>Hola</p></div>
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
            { cardHovered && <p>Hovereado!!!!</p>}
        </div>
  );
};
export default NFTcard;