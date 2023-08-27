import { useEffect, useState } from "react";
import { ITrefleSpecies } from "./data/interfaces/ITrefleSpecies";
import { IPlantNetSpecies } from "./data/interfaces/IPlantNetSpecies";
import Carrousel from "./components/Carrousel";
import Answer from "./components/Answer";

const App: React.FC = () => {
  const [trefleSpecies, setTrefleSpecies] = useState<ITrefleSpecies | null>();
  const [plantNetSpecies, setPlantNetSpecies] =
    useState<IPlantNetSpecies | null>();

  useEffect(() => {
    const baseApiUrl = import.meta.env.VITE_API_URL_LOCAL;
    const headers = {
      Accept: "*/*",
    };
    const getMoreData = async (scientificName: string) => {
      const apiUrl = `${baseApiUrl}/api/plant/moreData/${scientificName}`;
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers,
        });
        if (response.ok) {
          const data = (await response.json()) as IPlantNetSpecies;
          if (data.images !== undefined) {
            setPlantNetSpecies(data);
          } else {
            setPlantNetSpecies(null);
          }
        } else {
          console.log("Erreur de réponse du serveur - PlantNet");
          setPlantNetSpecies(null);
        }
      } catch (error) {
        console.log("Erreur lors de la requête fetch:", error);
      }
    };

    const getRandomPlant = async () => {
      const apiUrl = `${baseApiUrl}/api/plant/random`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers,
        });
        if (response.ok) {
          const data = await response.json();
          if (data.plant.image_url !== null) {
            setTrefleSpecies(data.plant);
            getMoreData(data.plant.slug);
          } else {
            setTrefleSpecies(null);
            getMoreData(data.plant.slug);
          }
        } else {
          console.log("Erreur de réponse du serveur - Trefle");
          setTrefleSpecies(null);
        }
      } catch (error) {
        console.log("Erreur lors de la requête fetch:", error);
      }
    };
    return () => {
      getRandomPlant();
    };
  }, []);

  if (
    (trefleSpecies === null && plantNetSpecies === null) ||
    (trefleSpecies === null && plantNetSpecies === undefined)
  ) {
    window.location.reload();
  }
  if (trefleSpecies === undefined && plantNetSpecies === undefined) {
    return <>Chargement...</>;
  }

  if (trefleSpecies !== null || plantNetSpecies !== null) {
    const images = () => {
      const imagesList = [];
      if (trefleSpecies?.image_url) {
        imagesList.push(trefleSpecies.image_url);
      }
      if (plantNetSpecies?.images) {
        plantNetSpecies.images.map((image) => {
          imagesList.push(image.o);
        });
      }
      return imagesList;
    };

    return (
      <div className="app w-screen h-screen flex justify-center items-center gap-4 p-8">
        <Carrousel images={images()} />
        <Answer/>
        {/* <p>
          {trefleSpecies?.scientific_name} ({trefleSpecies?.id})
        </p>
        <p>{trefleSpecies?.common_name}</p>
        {trefleSpecies?.image_url ? (
          <img
            src={trefleSpecies?.image_url}
            alt="plante"
            style={{ width: "350px" }}
          />
        ) : (
          <></>
        )}
        <hr />
        <p>{plantNetSpecies?.commonNames[0]}</p>
        <p>
          {plantNetSpecies?.name} ({plantNetSpecies?.family})
        </p>
        {plantNetSpecies?.images ? (
          <img
            src={plantNetSpecies?.images[0].m}
            alt="plante"
            style={{ width: "350px" }}
          />
        ) : (
          <></>
        )} */}
      </div>
    );
  }

  return <></>;
};

export default App;
