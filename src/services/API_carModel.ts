import {collection, getDocs, DocumentData} from "firebase/firestore";
import {getDownloadURL, ref, getStorage} from "firebase/storage";
import {db} from "../modules/firebase/firebase";
import {CarConfigurationsWithId, CarPosition, CarModel} from "../modules/configurator/types";
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
                color,
                wheelVariants: wheel_variant,
                interiorVariants: interior_variant,
                price
            }

            return newCar;
        })

        return carsArray;
    } catch (err: any) {
        throw new Error(err);
    }
}

interface Props {
    modelName: CarModel;
    color: string;
    wheelVariant: number;
    position: CarPosition
}

export const fetchCarImageByColorAndVariant = async ({modelName, color, wheelVariant, position}: Props) => {
    try {
        const modelFile = fileNames[modelName];

        const photoUrl = await getDownloadURL(ref(storage, `${modelFile}/models/wheel_${wheelVariant}/${color}/${position}.png`));

        return photoUrl;
    } catch (err: any) {
        throw new Error(err);
    }
}
      