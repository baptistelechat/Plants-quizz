import { IPlantNetSpecies } from "@/data/interfaces/IPlantNetSpecies";
import AnswerItem from "./components/AnswerItem";
import { useState } from "react";

interface IAnswerProps {
  answerList: IPlantNetSpecies[];
  goodAnswerScientificName: string;
}

const Answer: React.FC<IAnswerProps> = ({
  answerList,
  goodAnswerScientificName,
}) => {
  const [foundGoodAnswer, setFoundGoodAnswer] = useState(false);

  return answerList ? (
    <div className="answer-container h-1/2 flex flex-col basis-1/2 gap-4">
      <div className="flex flex-row gap-4 h-full w-full">
        <AnswerItem
          answer={answerList[0]}
          goodAnswerScientificName={goodAnswerScientificName}
          foundGoodAnswer={foundGoodAnswer}
          setFoundGoodAnswer={setFoundGoodAnswer}
        />
        <AnswerItem
          answer={answerList[1]}
          goodAnswerScientificName={goodAnswerScientificName}
          foundGoodAnswer={foundGoodAnswer}
          setFoundGoodAnswer={setFoundGoodAnswer}
        />
      </div>
      <div className="flex flex-row gap-4 h-full w-full">
        <AnswerItem
          answer={answerList[2]}
          goodAnswerScientificName={goodAnswerScientificName}
          foundGoodAnswer={foundGoodAnswer}
          setFoundGoodAnswer={setFoundGoodAnswer}
        />
        <AnswerItem
          answer={answerList[3]}
          goodAnswerScientificName={goodAnswerScientificName}
          foundGoodAnswer={foundGoodAnswer}
          setFoundGoodAnswer={setFoundGoodAnswer}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Answer;
