export interface Car {
  id: string;
  name: string;
  productionYear: number;
  colors: string[];
  wheelVariants: number[];
  interiorVariants: string[];
}

export enum CarPosition {
  front = "front",
  back = "back",
  side = "side",
  backLeft = "back_left",
  frontLeft = "front_left",
}
