import {firestore} from "../firebase";
import { collection, addDoc } from "firebase/firestore";
const collectionName = 'menus';

export const createMenu = async(menuData) => {
    try {
        const docRef = await addDoc(collection(firestore, collectionName), menuData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch(error){
        console.log("Error can not create a new menu");
    }
}