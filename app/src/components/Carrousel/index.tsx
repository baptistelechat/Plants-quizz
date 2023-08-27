import { useState } from "react";
import CarrouselControl from "./components/CarrouselControl";

interface ICarrouselProps {
  images: string[];
}

const Carrousel: React.FC<ICarrouselProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="carrousel-container h-full flex flex-col justify-center items-center basis-1/2 gap-4">
      <img className="rounded-md object-contain h-4/5 " src={images[imageIndex]} alt="plant image" />
      <CarrouselControl
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
        imageLength={images.length}
      />
    </div>
  );
};

export default Carrousel;
