import {collection, getDocs, DocumentData, doc, getDoc} from "firebase/firestore";
import {getDownloadURL, ref, getStorage} from "firebase/storage";
import {db} from "../modules/firebase/firebase";
import {Car, CarPos} from "../modules/configurator/types/carType";

interface CarPhotoProps {
    color: string;
    wheel_variant: number;
    photos: DocumentData;
}

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

export const fetchCarImageByColorAndVariant = async (id: string, color: string, wheelVariant: number, position: CarPos) => {
    try {
        const docRef = doc(db, "car-models", id);
        const response = await getDoc(docRef);

        const responseData = response.data();

        if (!responseData) {
            throw new Error("Car data could not be found.");
        }
        const {photo}: DocumentData = responseData;

        const photoRef: CarPhotoProps = photo.find((item: CarPhotoProps) => item.color === color && item.wheel_variant === wheelVariant);

        const photoDoc = await getDoc(photoRef.photos[position]);
        const storagePath = photoDoc.ref.path.slice(40); 

        const photoUrl = await getDownloadURL(ref(storage, storagePath));

        return photoUrl;
    } catch (err: any) {
        throw new Error(err);
    }
}
      