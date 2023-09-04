import { useState } from "react";
import CarrouselControl from "./components/CarrouselControl";

interface ICarrouselProps {
  images: string[];
}

const Carrousel: React.FC<ICarrouselProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 carrousel-container basis-1/2">
      <img className="object-contain rounded-md h-4/5 " src={images[imageIndex]} alt="plant image" />
      <CarrouselControl
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
        imageLength={images.length}
      />
    </div>
  );
};

export default Carrousel;
