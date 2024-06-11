import {collection, getDocs, DocumentData} from "firebase/firestore";
import {getDownloadURL} from "firebase/storage";
import {db} from "../modules/firebase/firebase";
import {Car, CarPhotoProps} from "../modules/configurator/types/carType";

const modelsRef = collection(db, "car-models");

export const fetchAllCarData = async () => {
    try {
        const response = await getDocs(modelsRef);

        const carsArray: Car[] = response.docs.map(car => {
            const carId = car.id;
            const {name, production_year, color, wheel_variant, interior_variant, photo}: DocumentData = car.data();

            let photosArr: CarPhotoProps[] = [...photo];
/*
            photosArr.forEach(item => {
                Object.keys(item.photos).forEach(async (key) => {
                    key = await getDownloadURL(item.photos.key);
                })
            })
*/
            photo.photos = photosArr;

            const newCar: Car = {
                id: carId,
                name: name,
                productionYear: production_year,
                colors: color,
                wheelVariants: wheel_variant,
                interiorVariants: interior_variant,
                photo: photo
            }

            return newCar;
        })

        console.log(carsArray);
        return carsArray;
    } catch (err: any) {
        throw new Error(err);
    }
}
      