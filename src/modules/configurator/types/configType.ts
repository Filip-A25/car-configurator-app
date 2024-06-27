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

export interface UserCarConfiguration {
    model: "Audi RS5" | "Audi RS6" | "Audi e-tron GT";
    productionYear: number;
    color: TextVariant;
    wheels: NumberVariant;
    interiorVariant: string;
    price: number;
}