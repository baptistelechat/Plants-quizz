import express from "express";
import { getAllPlant, getMoreDataOfPlantByScientificName, getRandomAnswer, getRandomPlant } from "../controllers/plant.controller";

const plantRouter = express.Router();

// GET all plant in a specific region
plantRouter.get("/", getAllPlant);
// GET a random plant in a specific region
plantRouter.get("/random", getRandomPlant);
// get more data of specific plant with scientific name
plantRouter.get("/moreData/:scientificName", getMoreDataOfPlantByScientificName);
// get random answers
plantRouter.get("/getAnswer/:answerNumber", getRandomAnswer);

export default plantRouter;
