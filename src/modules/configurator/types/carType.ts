export enum CarPosition {
  front = "front",
  back = "left",
  side = "side",
  backLeft = "back_left",
  frontLeft = "front-left",
}

export enum InteriorPosition {
  dash = "dash",
  seats = "seats"
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
  propertyName: CarPropertyName;
  label: string | number;
  name: string;
  description: string;
  price: number;
  modelName?: CarModel;
  isDescriptionDisplayed?: boolean;   
}

export type CarModel = "Audi RS5" | "Audi RS6" | "Audi e-tron GT";

export interface Car {
  id: string;
  name: string;
  productionYear: number;
  colors: string[];
  wheelVariants: number[];
  interiorVariants: string[];
}

export interface CarImageFetchProps {
  modelName: CarModel;
  color: string;
  wheelVariant: number;
  position: CarPosition
}
export type CarPropertyName = "color" | "wheels" | "interior_variants";
