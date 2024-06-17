import {getDoc, doc} from "firebase/firestore";
import {db} from "../modules/firebase";

export const fetchCarConfigurations = async (id: string) => {
    try {
        const configRef = doc(db, "car-models", id);

        const response = await getDoc(configRef);
        const responseData = response.data();

        return responseData;
    } catch (err: any) {
        throw new Error(err);
    }
}