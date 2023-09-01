import { Request, Response } from "express";
import { generateRandomNumber } from "../../utils/generateRandomNumber";
import { ITrefleSpeciesList } from "../data/interface/ITrefleSpeciesList";
import { IPlantNetSpecies } from "../data/interface/IPlantNetSpecies";

// GET all plant in a specific region
export const getAllPlant = async (req: Request, res: Response) => {
  const token = process.env.TREFLE_API_KEY;
  let headers = {
    Accept: "*/*",
  };
  const trefleApiUrl = (pageIndex: number, token: string | undefined) => {
    if (token) {
      return `https://trefle.io/api/v1/species?zone_id=fra&page=${pageIndex.toString()}&token=${token}`;
    }
    return "";
  };

  try {
    const response = await fetch(trefleApiUrl(1, token), {
      method: "GET",
      headers,
    });
    if (response.ok) {
      const firstSpeciesList = (await response.json()) as ITrefleSpeciesList;
      res.status(200).json({ firstSpeciesList });
    } else {
      res.status(404).json({
        path: `${req.originalUrl} - Get all plant`,
        errorMessage: "Failed to fetch all plants",
      });
    }
  } catch (error) {
    // Return the error
    res.status(404).json({
      path: `${req.originalUrl} - Get all plants`,
      errorMessage: error,
    });
  }
};

// get random answers
export const getRandomPlant = async (req: Request, res: Response) => {
  const answerNumber = req.params.answerNumber;
  const speciesPerPage = 20;

  const token = process.env.TREFLE_API_KEY;

  const plantNetApiUrl = (scientificName: string) => {
    return `https://api.plantnet.org/v1/projects/k-world-flora/species?pageSize=5&page=0&lang=fr&search=${
      scientificName.split("-subsp-")[0].split("-var-")[0]
    }`;
  };

  let headers = {
    Accept: "*/*",
  };

  const trefleApiUrl = (pageIndex: number, token: string | undefined) => {
    if (token) {
      return `https://trefle.io/api/v1/species?zone_id=fra&page=${pageIndex.toString()}&token=${token}`;
    }
    return "";
  };

  try {
    const response = await fetch(trefleApiUrl(1, token), {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch all plants");
    }

    const firstSpeciesList = (await response.json()) as ITrefleSpeciesList;
    const lastPageIndex = Math.ceil(
      firstSpeciesList.meta.total / speciesPerPage
    );

    const result = [];

    while (result.length < parseInt(answerNumber)) {
      const randomPageIndex = generateRandomNumber(lastPageIndex);
      const plantIndex = generateRandomNumber(speciesPerPage);
      const response = await fetch(trefleApiUrl(randomPageIndex, token), {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        continue; // Skip this iteration and try again
      }

      const trefleSpeciesList = (await response.json()) as ITrefleSpeciesList;
      const trefleSpecies = trefleSpeciesList.data[plantIndex];

      console.log(trefleSpecies.image_url)

      try {
        const response = await fetch(
          plantNetApiUrl(trefleSpecies.scientific_name),
          {
            method: "GET",
            headers,
          }
        );

        if (response.ok) {
          const plantNetSpecies = (await response.json()) as IPlantNetSpecies[];
          const imagesList = [];
          if (trefleSpecies.image_url) {
            imagesList.push(trefleSpecies.image_url);
          }
          if (plantNetSpecies[0]?.images) {
            plantNetSpecies[0].images.map((image) => {
              imagesList.push(image.o);
            });
          }

          result.push({
            name: plantNetSpecies[0].name,
            family: plantNetSpecies[0].family,
            commonNames: plantNetSpecies[0].commonNames[0],
            images: imagesList,
          });
        }
      } catch (error) {
        // Handle the error, but don't send a response here
      }
    }

    res.status(200).json({
      answer: result,
    });
  } catch (error) {
    res.status(404).json({
      path: `${req.originalUrl} - Get all plants`,
      errorMessage: error, // Send the error message
    });
  }
};