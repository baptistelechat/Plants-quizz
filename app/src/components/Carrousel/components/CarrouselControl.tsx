import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ICarrouselControlProps {
  imageIndex: number;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  imageLength: number;
}

const CarrouselControl: React.FC<ICarrouselControlProps> = ({
  imageIndex,
  setImageIndex,
  imageLength,
}) => {
  const handlePrevImage = () => {
    if (imageIndex === 0) {
      setImageIndex(0);
    }

    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (imageIndex === imageLength - 1) {
      setImageIndex(imageLength - 1);
    }
    if (imageIndex < imageLength - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  return (
    <div className="flex flex-row gap-4 carrousel-control">
      <Button
        disabled={imageIndex === 0}
        variant="outline"
        size="icon"
        onClick={handlePrevImage}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        disabled={imageIndex === imageLength - 1}
        variant="outline"
        size="icon"
        onClick={handleNextImage}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CarrouselControl;
