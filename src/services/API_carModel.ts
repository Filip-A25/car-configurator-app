import {collection, getDocs, DocumentData} from "firebase/firestore";
import {getDownloadURL, ref, getStorage} from "firebase/storage";
import {db} from "../modules/firebase/firebase";
import {CarConfigurationsWithId, CarPosition} from "../modules/configurator/types";
import {fileNames} from "./const/fileNames";

const storage = getStorage();

const modelsRef = collection(db, "car-models");

export const fetchAllCarData = async () => {
    try {
        const response = await getDocs(modelsRef);

        const carsArray: CarConfigurationsWithId[] = response.docs.map(car => {
            const carId = car.id;
            const {name, production_year, color, wheel_variant, interior_variant, price}: DocumentData = car.data();

            const newCar: CarConfigurationsWithId = {
                id: carId,
                model: name,
                productionYear: production_year,
                color: color,
                wheelVariants: wheel_variant,
                interiorVariants: interior_variant,
                price: price
            }

            return newCar;
        })

        return carsArray;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchCarImageByColorAndVariant = async (modelName: "Audi RS5" | "Audi RS6" | "Audi e-tron GT", color: string, wheelVariant: number, position: CarPosition) => {
    try {
        let modelFile = fileNames[modelName];

        const photoUrl = await getDownloadURL(ref(storage, `${modelFile}/models/wheel_${wheelVariant}/${color}/${position}.png`));

        return photoUrl;
    } catch (err: any) {
        throw new Error(err);
    }
}
      