import { CarModel, CarPosition } from "./carType";

export interface ImageColorAndVariantProps {
    modelName: CarModel;
    color: string;
    wheelVariant: number;
}

export interface CarImageColorAndVariantProps {
    modelName: CarModel;
    color: string;
    wheelVariant: number;
    position: CarPosition;
}

export interface PropertyVariantProps {
    modelName: CarModel;
    name: string;
    variant: string | number;
}