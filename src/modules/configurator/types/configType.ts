export interface Variant {
    variant: number;
    price: number;
}

export interface CarConfigurations {
    model: string;
    productionYear: number;
    colors: string[];
    wheelVariants: Variant[];
    interiorVariants: Variant[];
    totalPrice: number;
}