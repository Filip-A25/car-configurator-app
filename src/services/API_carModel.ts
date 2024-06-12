import {collection, getDocs, DocumentData} from "firebase/firestore";
import {getDownloadURL, ref, getStorage} from "firebase/storage";
import {db} from "../modules/firebase/firebase";
import {Car, CarPosition} from "../modules/configurator/types/carType";

const storage = getStorage();

const modelsRef = collection(db, "car-models");

export const fetchAllCarData = async () => {
    try {
        const response = await getDocs(modelsRef);

        const carsArray: Car[] = response.docs.map(car => {
            const carId = car.id;
            const {name, production_year, color, wheel_variant, interior_variant}: DocumentData = car.data();

            const newCar: Car = {
                id: carId,
                name: name,
                productionYear: production_year,
                colors: color,
                wheelVariants: wheel_variant,
                interiorVariants: interior_variant,
            }

            return newCar;
        })

        return carsArray;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchCarImageByColorAndVariant = async (modelName: string, color: string, wheelVariant: number, position: CarPosition) => {
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
                throw new Error("Model file doesn't exist");
        }

        const photoUrl = await getDownloadURL(ref(storage, `${modelFile}/models/${color}/${position}-${wheelVariant}.png`));

        return photoUrl;
    } catch (err: any) {
        throw new Error(err);
    }
}
      