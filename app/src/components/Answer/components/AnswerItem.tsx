import { useState } from "react";

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
  
  const handleGoodAnswer = () => {
    const isCorrect = goodAnswerScientificName === scientificName;

    if (isCorrect) {
      setBgColor("bg-green-200 text-primary");
    }

    if (!isCorrect) {
      setBgColor("bg-red-200 text-primary");
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
    </div>
  );
};

export default AnswerItem;
