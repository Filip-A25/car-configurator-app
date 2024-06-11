import {collection, getDocs, DocumentData} from "firebase/firestore";
import {db} from "../modules/firebase/firebase";
import {Car} from "../modules/configurator/types/carType";

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
                interiorVariants: interior_variant
            }

            return newCar;
        })

        return carsArray;
    } catch (err: any) {
        throw new Error(err);
    }
}
      