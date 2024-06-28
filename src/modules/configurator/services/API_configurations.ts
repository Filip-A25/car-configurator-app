import {db} from "../../firebase";
import {doc, deleteDoc} from "firebase/firestore";

export const deleteUserConfiguration = async (id: string) => {
    try {
        const response = await deleteDoc(doc(db, "user-configurations", id));

        return response;
    } catch (err: any) {
        throw new Error(err);
    }
}