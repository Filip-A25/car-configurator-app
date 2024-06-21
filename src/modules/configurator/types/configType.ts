export interface Variant {
    label: string | number;
    name: string;
    price: number;
}

export interface CarConfigurations {
    model: string;
    productionYear: number;
    colors: Variant[];
    wheelVariants: Variant[];
    interiorVariants: string[];
}

export interface UserCarConfiguration {
    model: string;
    productionYear: number;
    color: Variant;
    wheelVariant: Variant;
    interiorVariant: string;
}

export interface PropIndex {
    color: number;
    wheels: number;
}