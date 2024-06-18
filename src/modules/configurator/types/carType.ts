export enum CarPosition {
  front = "front",
  back = "left",
  side = "side",
  backLeft = "back_left",
  frontLeft = "front-left",
}

export interface CarModel {
  id: string;
  model: string;
  productionYear: number;
  color: string;
  wheelVariant: number;
  interiorVariant: string;
  totalPrice: number;
}

export interface CarModelImages {
  front: string;
  back: string;
  side: string;
  back_left: string;
  front_left: string;
}
