import express from "express";
import { getAllPlant, getRandomPlant, getWikipediaArticle } from "../controllers/plant.controller";

const plantRouter = express.Router();

// GET all plant in a specific region
plantRouter.get("/", getAllPlant);
// GET random answers
plantRouter.get("/getAnswer/:answerNumber", getRandomPlant);
// GET Wikipedia data
plantRouter.get("/getWikiArticle/:scientificName/:commonName", getWikipediaArticle);

export default plantRouter;
