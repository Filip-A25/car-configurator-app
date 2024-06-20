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