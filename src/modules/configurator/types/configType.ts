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
    model: string;
    productionYear: number;
    colors: TextVariant[];
    wheelVariants: NumberVariant[];
    interiorVariants: string[];
}

export interface UserCarConfiguration {
    model: string;
    productionYear: number;
    color: TextVariant;
    wheels: NumberVariant;
    interiorVariant: string;
}

export interface PropIndex {
    color: number;
    wheels: number;
}