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

        const listRef = ref(storage, `${modelFile}/models/${color}/`);
        const photosList = await listAll(listRef);

        const photoListItems = photosList.items.filter(item => item.name.includes("1"));
        const photoPromises = photoListItems.map(item => getDownloadURL(ref(storage, item.fullPath)));

        const filteredPhotosList = await Promise.all(photoPromises);

        console.log(filteredPhotosList);

        return filteredPhotosList;
    } catch (err: any) {
        throw new Error(err);
    }
}