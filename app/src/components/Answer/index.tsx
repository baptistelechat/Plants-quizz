import { useEffect, useState } from "react";
import AnswerItem from "./components/AnswerItem";
import { IPlantNetSpecies } from "@/data/interfaces/IPlantNetSpecies";
import { ITrefleSpecies } from "@/data/interfaces/ITrefleSpecies";

const Answer = () => {
  const [answerList, setAnswerList] = useState<IPlantNetSpecies[]>();

  useEffect(() => {
    const baseApiUrl = import.meta.env.VITE_API_URL_LOCAL;
    const headers = {
      Accept: "*/*",
    };

    const getMoreData = async (plantList: string[]) => {
      const result = [];
      console.log(plantList);
      for (let index = 0; index < plantList.length; index++) {
        const plant = plantList[index];

        const apiUrl = `${baseApiUrl}/api/plant/moreData/${plant}`;
        try {
          const response = await fetch(apiUrl, {
            method: "GET",
            headers,
          });
          if (response.ok) {
            const data = (await response.json()) as IPlantNetSpecies;
            result.push({
              name: data.name,
              family: data.family,
              commonNames: data.commonNames,
              images: data.images,
            });
          } else {
            console.log("Erreur de réponse du serveur - PlantNet");
            result.push({
              name: "-",
              family: "-",
              commonNames: ["-"],
              images: [],
            });
          }
        } catch (error) {
          console.log("Erreur lors de la requête fetch:", error);
        }
      }
      console.log(result);
      setAnswerList(result);
    };

    const getAnswer = async () => {
      const apiUrl = `${baseApiUrl}/api/plant/getAnswer/3`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers,
        });
        if (response.ok) {
          const data = await response.json();
          const plantList = data.answer.map(
            (item: { plant: ITrefleSpecies }) => item.plant.slug
          ) as string[];
          getMoreData(plantList);
        } else {
          console.log("Erreur de réponse du serveur - Trefle");
        }
      } catch (error) {
        console.log("Erreur lors de la requête fetch:", error);
      }
    };

    return () => {
      getAnswer();
    };
  }, []);

  return answerList ? (
    <div className="answer-container h-1/2 flex flex-col basis-1/2 gap-4">
      <div className="flex flex-row h-full w-full gap-4">
        <AnswerItem
          scientificName={answerList[0].name}
          commonName={answerList[0].commonNames[0]}
        />
        <AnswerItem
          scientificName={answerList[1].name}
          commonName={answerList[1].commonNames[0]}
        />
      </div>
      <div className="flex flex-row h-full w-full gap-4">
        <AnswerItem
          scientificName={answerList[2].name}
          commonName={answerList[2].commonNames[0]}
        />
        <AnswerItem
          scientificName={answerList[2].name}
          commonName={answerList[2].commonNames[0]}
        />
        {/* <AnswerItem
          scientificName={answerList[3].name}
          commonName={answerList[3].commonNames[0]}
        /> */}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Answer;
