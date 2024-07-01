import {db} from "../../firebase";
import {doc, deleteDoc, getDocs, collection, DocumentData} from "firebase/firestore";
import { UserCarConfiguration } from "../types";

export const deleteUserConfiguration = async (userId: string, configId: string) => {
    try {
        const response = await deleteDoc(doc(db, `users/${userId}/configurations`, configId));

        return response;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const fetchAllUserConfigurations = async (id: string) => {
    try {
        const configsRef = collection(db, `users/${id}/configurations`);
        const response = await getDocs(configsRef);

        const configurationsArray: UserCarConfiguration[] = response.docs.map(config => {
            const userId = config.id;
            const {model, model_id, production_year, color, wheel_variant, interior_variant, creation_date, total_price}: DocumentData = config.data();
            
            const newConfig: UserCarConfiguration = {
                id: userId,
                model,
                modelId: model_id,
                productionYear: production_year,
                color,
                wheels: wheel_variant,
                interiorVariant: interior_variant,
                creationDate: creation_date,
                totalPrice: total_price
            }

            return newConfig;
        })

        return configurationsArray;
    } catch (err: any) {    
        throw new Error(err);
    }
}