export interface Car {
  id: string;
  name: string;
  productionYear: number;
  colors: string[];
  wheelVariants: number[];
  interiorVariants: string[];
  photo: CarPhotoProps;
}

export interface CarPhotoProps {
  color: string;
  wheel_variant: number;
  photos: object[];
}
