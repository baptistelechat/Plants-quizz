import { ITrefleSpecies } from "./ITrefleSpecies";

export interface ITrefleSpeciesList {
  data: ITrefleSpecies[];
  links: {
    self: string;
    first: string;
    next: string;
    last: string;
  };
  meta: {
    total: number;
  };
}
