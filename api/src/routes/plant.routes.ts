import express from "express";
import { getAllPlant, getRandomPlant } from "../controllers/plant.controller";

const plantRouter = express.Router();

// GET all plant in a specific region
plantRouter.get("/", getAllPlant);
// get random answers
plantRouter.get("/getAnswer/:answerNumber", getRandomPlant);

export default plantRouter;
