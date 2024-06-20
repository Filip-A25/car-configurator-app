import {getDoc, doc} from "firebase/firestore";
import {db, storage} from "../modules/firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { CarConfigurations } from "../modules/configurator/types";

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

export const fetchCarImagesByColorAndVariant = async (modelName: string, color: string, wheelVariant: number) => {
    try {
        let modelFile: string;
        switch(modelName) {
            case "Audi RS5":
                modelFile = "audi_rs5";
                break;
            case "Audi RS6":
                modelFile = "audi-rs6";
                break;
            case "Audi e-tron GT":
                modelFile = "audi_e-tron_gt";
                break;
            default:
                throw new Error("Model file doesn't exist.");
        }

        const listRef = ref(storage, `${modelFile}/models/wheel_${wheelVariant}/${color}`);
        const photosList = await listAll(listRef);

        const photoPromises = photosList.items.map(item => getDownloadURL(ref(storage, item.fullPath)));


        const filteredPhotosList = await Promise.all(photoPromises);

        return filteredPhotosList;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchPropertyImagesByVariant = async (modelName:string, name: string, variant: string | number) => {
    try {
        let modelFile: string;
        switch(modelName) {
            case "Audi RS5":
                modelFile = "audi_rs5";
                break;
            case "Audi RS6":
                modelFile = "audi-rs6";
                break;
            case "Audi e-tron GT":
                modelFile = "audi_e-tron_gt";
                break;
            default:
                throw new Error("Model file doesn't exist.");
        }
if (name === "color") name = "colors";
        const variantRef = ref(storage, `${modelFile}/${name}/${variant}.png`);

        const photoItem = await getDownloadURL(variantRef);
        
        return photoItem;
    } catch (err: any) {
        throw new Error(err);
    }
}