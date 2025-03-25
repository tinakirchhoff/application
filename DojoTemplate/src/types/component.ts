import {Accordion} from "./accordion.ts";

export type Component = {
  id: string,
  difficulty: string,
  description: string[],
  accordions: Accordion[]
}
