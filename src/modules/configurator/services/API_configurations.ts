import {getDoc, doc, deleteDoc} from "firebase/firestore";
import {db, storage} from "../../firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { CarConfigurations, CarModel } from "../types";
import {fileNames, sortedPhotoNames} from "./const/fileNames";

export interface ColorAndVariantProps {
    modelName: CarModel;
    color: string;
    wheelVariant: number;
}

export interface VariantProps {
    modelName: CarModel;
    name: string;
    variant: string | number;
}

export const fetchCarConfigurations = async (id: string) => {
    try {
        const configRef = doc(db, "car-models", id);

        const response = await getDoc(configRef);
        const responseData = response.data();

        if (!responseData) throw new Error("Data could not be found.");
        const carData: CarConfigurations = {
            model: responseData.name,
            productionYear: responseData.production_year,
            color: responseData.color,
            wheelVariants: responseData.wheel_variant,
            interiorVariants: responseData.interior_variant,
            price: responseData.price
        }

        return carData;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchCarImagesByColorAndVariant = async ({modelName, color, wheelVariant}: ColorAndVariantProps) => {
    try {
        const modelFile = fileNames[modelName];

        const listRef = ref(storage, `${modelFile}/models/wheel_${wheelVariant}/${color}`);
        const photosList = await listAll(listRef);

        const photoPromises = photosList.items.sort((a, b) => sortedPhotoNames.indexOf(a.name) - sortedPhotoNames.indexOf(b.name)).map(item => getDownloadURL(ref(storage, item.fullPath)));

        const filteredPhotosList = await Promise.all(photoPromises);

        return filteredPhotosList;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchPropertyImagesByVariant = async ({modelName, name, variant}: VariantProps) => {
    try {
        const modelFile = fileNames[modelName];

        const variantRef = ref(storage, `${modelFile}/${name}/${variant}.png`);

        const photoItem = await getDownloadURL(variantRef);
        
        return photoItem;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const deleteUserConfiguration = async (id: string) => {
    try {
        const response = await deleteDoc(doc(db, "user-configurations", id));

        return response;
    } catch (err: any) {
        throw new Error(err);
    }
}