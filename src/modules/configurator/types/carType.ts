export enum CarPosition {
  front = "front",
  back = "left",
  side = "side",
  backLeft = "back_left",
  frontLeft = "front-left",
}

export interface CarModelImages {
  front: string;
  back: string;
  side: string;
  back_left: string;
  front_left: string;
}

export interface CarProperty {
  index: number;
  propertyName: "color" | "wheels";
  label: string | number;
  name: string;
  description: string;
  price: number;
  modelName?: CarModel;   
}

export type CarModel = "Audi RS5" | "Audi RS6" | "Audi e-tron GT";