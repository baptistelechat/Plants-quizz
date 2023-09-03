import { useEffect, useState } from "react";
import { IPlantNetSpecies } from "./data/interfaces/IPlantNetSpecies";
import Answer from "./components/Answer";
import Carrousel from "./components/Carrousel";

const App: React.FC = () => {
  const [answerList, setAnswerList] = useState<IPlantNetSpecies[]>();

  useEffect(() => {
    const baseApiUrl = import.meta.env.VITE_API_URL_LOCAL;
    const headers = {
      Accept: "*/*",
    };

    const getAnswer = async () => {
      const apiUrl = `${baseApiUrl}/api/plant/getAnswer/4`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers,
        });
        if (response.ok) {
          const data = await response.json();
          setAnswerList(data.answer);
        } else {
          console.log("Erreur de réponse du serveur - PlantNet");
        }
      } catch (error) {
        console.log("Erreur lors de la requête fetch (PlantNet):", error);
      }
    };

    return () => {
      getAnswer();
    };
  }, []);

  if (answerList === null) {
    window.location.reload();
  }
  if (answerList === undefined) {
    return <>Chargement...</>;
  }

  if (answerList !== null) {
    const goodAnswerIndex = Math.floor(Math.random() * 4); // Generates 0, 1, 2, or 3

    return (
      <div className="app w-screen h-screen flex justify-center items-center gap-4 p-8">
        <Carrousel images={answerList[goodAnswerIndex].images} />
        <Answer
          answerList={answerList}
          goodAnswerScientificName={answerList[goodAnswerIndex].name}
        />
      </div>
    );
  }

  return <></>;
};

export default App;
