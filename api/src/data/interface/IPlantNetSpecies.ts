import { IPlantNetImageData } from "./IPlantNetImageData";

export interface IPlantNetSpecies {
  name: string;
  family: string;
  commonNames: string;
  images: IPlantNetImageData[];
}
