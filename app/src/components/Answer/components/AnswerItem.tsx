import { useEffect, useState } from "react";
import JSConfetti from "js-confetti";
import WikipediaDialog from "@/components/WikipediaDialog";
import { IPlantNetSpecies } from "@/data/interfaces/IPlantNetSpecies";

interface IAnswerItemProps {
  answer: IPlantNetSpecies;
  goodAnswerScientificName: string;
  foundGoodAnswer: boolean;
  setFoundGoodAnswer: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswerItem: React.FC<IAnswerItemProps> = ({
  answer,
  goodAnswerScientificName,
  foundGoodAnswer,
  setFoundGoodAnswer,
}) => {
  const [bgColor, setBgColor] = useState<string>(
    "bg-secondary hover:bg-primary text-primary hover:text-secondary"
  );

  const isCorrect = goodAnswerScientificName === answer.name;

  useEffect(() => {
    if (foundGoodAnswer && isCorrect) {
      setBgColor("bg-green-200 text-primary");
    }
    if (foundGoodAnswer && !isCorrect) {
      setBgColor("bg-red-200 text-primary");
    }
    if (!foundGoodAnswer) {
      setBgColor(
        "bg-secondary hover:bg-primary text-primary hover:text-secondary"
      );
    }
  }, [foundGoodAnswer]);

  const handleGoodAnswer = () => {
    if (!foundGoodAnswer) {
      if (isCorrect) {
        setBgColor("bg-green-200 text-primary");
        setFoundGoodAnswer(true);
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
      }
    }
  };

  return (
    <div
      className={`rounded-md w-full h-full ${bgColor} flex flex-col justify-center items-center gap-2`}
      onClick={() => handleGoodAnswer()}
    >
      <p className="text-lg font-bold">{answer.name}</p>
      {answer.commonNames !== undefined ? (
        <p className="text-lg italic">({answer.commonNames})</p>
      ) : (
        <></>
      )}
      {foundGoodAnswer ? <WikipediaDialog answer={answer} /> : <></>}
    </div>
  );
};

export default AnswerItem;
