import {CarModel} from "./carType";
import { Timestamp } from "firebase/firestore";

export interface TextVariant {
    label: string;
    name: string;
    price: number;
}

export interface NumberVariant {
    label: number;
    name: string;
    price: number;
}

export interface CarConfigurations {
    model: CarModel;
    productionYear: number;
    color: TextVariant[];
    wheelVariants: NumberVariant[];
    interiorVariants: string[];
    price: number;
}

export interface CarConfigurationsWithId extends CarConfigurations {
    id: string;
}

export interface UserCarConfiguration {
    id: string;
    model: CarModel;
    modelId: string;
    productionYear: number;
    color: TextVariant;
    wheels: NumberVariant;
    interiorVariant: string;
    creationDate: Timestamp;
    totalPrice: number;
}

export interface CurrentPropertyIndex {
    color: number;
    wheels: number;
}