import {getDoc, doc} from "firebase/firestore";
import {db, storage} from "../modules/firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { CarConfigurations } from "../modules/configurator/types";
import {fileNames} from "./const/fileNames";

export const fetchCarConfigurations = async (id: string) => {
    try {
        const configRef = doc(db, "car-models", id);

        const response = await getDoc(configRef);
        const responseData = response.data();

        if (!responseData) throw new Error("Data could not be found.");
        const carData: CarConfigurations = {
            model: responseData.name,
            productionYear: responseData.production_year,
            colors: responseData.color,
            wheelVariants: responseData.wheel_variant,
            interiorVariants: responseData.interior_variant
        }

        return carData;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchCarImagesByColorAndVariant = async (modelName: "Audi RS5" | "Audi RS6" | "Audi e-tron GT", color: string, wheelVariant: number) => {
    try {
        let modelFile = fileNames[modelName];

        const listRef = ref(storage, `${modelFile}/models/wheel_${wheelVariant}/${color}`);
        const photosList = await listAll(listRef);

        const photoPromises = photosList.items.map(item => getDownloadURL(ref(storage, item.fullPath)));


        const filteredPhotosList = await Promise.all(photoPromises);

        return filteredPhotosList;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchPropertyImagesByVariant = async (modelName: "Audi RS5" | "Audi RS6" | "Audi e-tron GT", name: string, variant: string | number) => {
    try {
        let modelFile = fileNames[modelName];

        if (name === "color") name = "colors";
        const variantRef = ref(storage, `${modelFile}/${name}/${variant}.png`);

        const photoItem = await getDownloadURL(variantRef);
        
        return photoItem;
    } catch (err: any) {
        throw new Error(err);
    }
}