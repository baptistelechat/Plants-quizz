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

// GET a random plant in a specific region
export const getRandomPlant = async (req: Request, res: Response) => {
  const speciesPerPage = 20;

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

      const lastPageIndex = Math.ceil(
        firstSpeciesList.meta.total / speciesPerPage
      );

      const randomPageIndex = generateRandomNumber(lastPageIndex);
      const plantIndex = generateRandomNumber(speciesPerPage);

      try {
        const response = await fetch(trefleApiUrl(randomPageIndex, token), {
          method: "GET",
          headers,
        });

        if (response.ok) {
          const speciesList = (await response.json()) as ITrefleSpeciesList;
          const plant = speciesList.data[plantIndex];
          res.status(200).json({
            plant: {
              id: plant.id,
              common_name: plant.common_name,
              slug: plant.slug,
              scientific_name: plant.scientific_name,
              image_url: plant.image_url,
            },
            pageIndex: randomPageIndex,
            plantIndex,
          });
        } else {
          res.status(404).json({
            path: `${req.originalUrl} - Get single plant`,
            errorMessage: "Failed to fetch single plant",
          });
        }
      } catch (error) {
        // Return the error
        res.status(404).json({
          path: `${req.originalUrl} - Get single plant`,
          errorMessage: error,
        });
      }
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

// get more data of specific plant with scientific name
export const getMoreDateOfPlantByScientificName = async (
  req: Request,
  res: Response
) => {
  const scientificName = req.params.scientificName;
  const plantNetApiUrl = `https://api.plantnet.org/v1/projects/k-world-flora/species?pageSize=5&page=0&lang=fr&search=${scientificName.split(
    "-subsp-"
  )[0].split("-var-")[0]}`;
  let headers = {
    Accept: "*/*",
  };
  try {
    const response = await fetch(plantNetApiUrl, {
      method: "GET",
      headers,
    });
    if (response.ok) {
      const moreDataSpecies = (await response.json()) as IPlantNetSpecies[];
      res.status(200).json({
        name: moreDataSpecies[0].name,
        family: moreDataSpecies[0].family,
        commonNames: moreDataSpecies[0].commonNames,
        images: moreDataSpecies[0].images,
      });
    } else {
      res.status(404).json({
        path: `${req.originalUrl} - Get more data of plant`,
        errorMessage: "Failed to fetch all plants",
      });
    }
  } catch (error) {
    // Return the error
    res.status(404).json({
      path: `${req.originalUrl} -  Get more data of plant`,
      errorMessage: error,
    });
  }
};
