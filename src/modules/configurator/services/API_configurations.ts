import {getDocs, collection, DocumentData, getDoc, doc, deleteDoc} from "firebase/firestore";
import {db, storage} from "../../firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { CarConfigurations, CarModel, UserCarConfiguration } from "../types";
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

export const deleteUserConfiguration = async (userId: string, configId: string) => {
    try {
        const response = await deleteDoc(doc(db, `users/${userId}/configurations`, configId));

        return response;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchAllUserConfigurations = async (id: string) => {
    try {
        const configsRef = collection(db, `users/${id}/configurations`);
        const response = await getDocs(configsRef);

        const configurationsArray: UserCarConfiguration[] = response.docs.map(config => {
            const userId = config.id;
            const {model, model_id, production_year, color, wheel_variant, interior_variant, creation_date, total_price}: DocumentData = config.data();
            
            const newConfig: UserCarConfiguration = {
                id: userId,
                model,
                modelId: model_id,
                productionYear: production_year,
                color,
                wheels: wheel_variant,
                interiorVariant: interior_variant,
                creationDate: creation_date,
                totalPrice: total_price
            }

            return newConfig;
        })

        return configurationsArray;
    } catch (err: any) {    
        throw new Error(err);
    }
}