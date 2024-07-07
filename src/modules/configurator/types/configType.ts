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
    wheels: NumberVariant[];
    interior_variants: TextVariant[];
    price: number;
}

export interface CarConfigurationsWithId extends CarConfigurations {
    id: string;
}

export interface UserCarConfiguration {
    model: CarModel;
    modelId: string;
    productionYear: number;
    color: TextVariant;
    wheels: NumberVariant;
    interior_variants: TextVariant;
    creationDate: Timestamp;
    totalPrice: number;
    id?: string;
}

export interface CurrentPropertyIndex {
    color: number;
    wheels: number;
    interior_variants: number;
}