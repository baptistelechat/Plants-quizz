import { useEffect, useState } from "react";
import CarrouselControl from "./components/CarrouselControl";
import mediumZoom from "medium-zoom";

interface ICarrouselProps {
  images: string[];
  extraStyle?: string;
}

const Carrousel: React.FC<ICarrouselProps> = ({ images, extraStyle }) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const zoom = mediumZoom(".mediumZoom", {
      margin: 48,
      background: "rgba(0,0,0,0.9)",
    }); // Sélectionnez les images avec la classe "mediumZoom" pour appliquer le zoom

    return () => {
      zoom.detach(); // Détachez le zoom lors du démontage du composant
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 carrousel-container ${extraStyle}`}
    >
      <img
        className="object-contain rounded-md h-4/5 mediumZoom"
        src={images[imageIndex]}
        alt="plant image"
      />
      <CarrouselControl
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
        imageLength={images.length}
      />
    </div>
  );
};

export default Carrousel;
