import { useState } from "react";
import JSConfetti from "js-confetti";
import WikipediaDialog from "@/components/WikipediaDialog";

interface IAnswerItemProps {
  scientificName: string;
  commonName: string;
  goodAnswerScientificName: string;
}

const AnswerItem: React.FC<IAnswerItemProps> = ({
  scientificName,
  commonName,
  goodAnswerScientificName,
}) => {
  const [bgColor, setBgColor] = useState<string>(
    "bg-secondary hover:bg-primary text-primary hover:text-secondary"
  );
  const [isSelected, setIsSelected] = useState(false);

  const handleGoodAnswer = () => {
    const isCorrect = goodAnswerScientificName === scientificName;

    if (isCorrect) {
      setBgColor("bg-green-200 text-primary");
      setIsSelected(true);
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        // confettiColors: [
        //   "#228B22", // Forest Green
        //   "#2E8B57", // Sea Green
        //   "#32CD32", // Lime Green
        //   "#3CB371", // Medium Sea Green
        //   "#008000", // Green
        //   "#6B8E23", // Olive Drab
        // ],
        emojis: [
          "🌷",
          "💐",
          "🌸",
          "🌹",
          "🌺",
          "🍀",
          "🍃",
          "🌿",
          "🍃",
          "🌻",
          "🌼",
          "🌱",
          "🌳",
        ],
        emojiSize: 50,
      });
    }

    if (!isCorrect) {
      setBgColor("bg-red-200 text-primary");
      setIsSelected(true);
    }
  };

  return (
    <div
      className={`rounded-md w-full h-full ${bgColor} flex flex-col justify-center items-center`}
      onClick={() => handleGoodAnswer()}
    >
      <p className="text-lg font-bold">{scientificName}</p>
      {commonName !== undefined ? (
        <p className="text-lg italic">({commonName})</p>
      ) : (
        <></>
      )}
      {isSelected ? (
        <WikipediaDialog
          scientificName={scientificName}
          commonName={commonName}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AnswerItem;
