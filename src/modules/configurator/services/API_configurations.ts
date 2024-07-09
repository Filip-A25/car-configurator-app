import {getDocs, collection, DocumentData, getDoc, doc, deleteDoc} from "firebase/firestore";
import {db, storage} from "../../firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { CarConfigurations, ImageColorAndVariantProps, PropertyVariantProps, UserCarConfiguration } from "../types";
import {fileNames, sortedPhotoNames} from "./const/fileNames";

export const fetchCarConfigurations = async (id: string): Promise<CarConfigurations> => {
    try {
        const configRef = doc(db, "car-models", id);

        const response = await getDoc(configRef);
        const responseData = response.data();

        if (!responseData) throw new Error("Data could not be found.");
        const carData: CarConfigurations = {
            model: responseData.name,
            productionYear: responseData.production_year,
            color: responseData.color,
            wheels: responseData.wheel_variant,
            interior_variants: responseData.interior_variant,
            price: responseData.price
        }

        return carData;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchCarImagesByColorAndVariant = async ({modelName, color, wheelVariant}: ImageColorAndVariantProps): Promise<string[]> => {
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

export const fetchPropertyImageByVariant = async ({modelName, name, variant}: PropertyVariantProps): Promise<string> => {
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

export const fetchAllUserConfigurations = async (id: string): Promise<UserCarConfiguration[]> => {
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
                interior_variants: interior_variant,
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

export const fetchAllPropertyImagesByVariant = async ({modelName, name, variant}: PropertyVariantProps): Promise<string[]> => {
    try {
        const listRef = ref(storage, `${modelName}/${name}/${variant}`);
        const imagesList = await listAll(listRef);

        const imagePromises = imagesList.items.map(image => getDownloadURL(ref(storage, image.fullPath)));

        const propertyImagesArray = await Promise.all(imagePromises);

        return propertyImagesArray;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchUserConfiguration = async (userId: string, configurationId: string): Promise<UserCarConfiguration> => {
    try {
        const configRef = doc(db, `users/${userId}/configurations/${configurationId}`);
        const response = await getDoc(configRef);
        
        const responseData = response.data();

        if (!responseData) throw new Error("Data could not be found.");
        const userConfig: UserCarConfiguration = {
            model: responseData.model,
            modelId: responseData.model_id,
            productionYear: responseData.production_year,
            color: responseData.color,
            wheels: responseData.wheel_variant,
            interior_variants: responseData.interior_variants,
            creationDate: responseData.creation_date,
            totalPrice: responseData.total_price
        }

        return userConfig;
    } catch (err: any) {
        throw new Error(err);
    }
}