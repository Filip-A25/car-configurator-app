import {collection, getDocs, DocumentData} from "firebase/firestore";
import {getDownloadURL, ref} from "firebase/storage";
import {db, storage} from "../../firebase/firebase";
import {CarConfigurationsWithId, CarImageColorAndVariantProps} from "../types";
import {fileNames} from "./const/fileNames";

const modelsRef = collection(db, "car-models");

export const fetchAllCarData = async (): Promise<CarConfigurationsWithId[]> => {
    try {
        const response = await getDocs(modelsRef);

        const carsArray: CarConfigurationsWithId[] = response.docs.map(car => {
            const carId = car.id;
            const {name, production_year, color, wheel_variant, interior_variant, price}: DocumentData = car.data();

            const newCar: CarConfigurationsWithId = {
                id: carId,
                model: name,
                productionYear: production_year,
                color,
                wheels: wheel_variant,
                interior_variants: interior_variant,
                price
            }

            return newCar;
        })

        return carsArray;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchCarImageByColorAndVariant = async ({modelName, color, wheelVariant, position}: CarImageColorAndVariantProps): Promise<string> => {
    try {
        const modelFile = fileNames[modelName];

        const photoUrl = await getDownloadURL(ref(storage, `${modelFile}/models/wheel_${wheelVariant}/${color}/${position}.png`));

        return photoUrl;
    } catch (err: any) {
        throw new Error(err);
    }
}
      