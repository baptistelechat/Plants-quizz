import { IPlantNetSpecies } from "@/data/interfaces/IPlantNetSpecies";
import AnswerItem from "./components/AnswerItem";

interface IAnswerProps {
  answerList: IPlantNetSpecies[];
  goodAnswerScientificName: string;
}

const Answer: React.FC<IAnswerProps> = ({
  answerList,
  goodAnswerScientificName,
}) => {
  return answerList ? (
    <div className="answer-container h-1/2 flex flex-col basis-1/2 gap-4">
      <div className="flex flex-row h-full w-full gap-4">
        <AnswerItem
          scientificName={answerList[0].name}
          commonName={answerList[0].commonNames}
          goodAnswerScientificName={goodAnswerScientificName}
        />
        <AnswerItem
          scientificName={answerList[1].name}
          commonName={answerList[1].commonNames}
          goodAnswerScientificName={goodAnswerScientificName}
        />
      </div>
      <div className="flex flex-row h-full w-full gap-4">
        <AnswerItem
          scientificName={answerList[2].name}
          commonName={answerList[2].commonNames}
          goodAnswerScientificName={goodAnswerScientificName}
        />
        <AnswerItem
          scientificName={answerList[3].name}
          commonName={answerList[3].commonNames}
          goodAnswerScientificName={goodAnswerScientificName}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Answer;
