import {firestore} from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
const collectionName = 'menus';

export const createMenu = async(menuData) => {
    try {
        const docRef = await addDoc(collection(firestore, collectionName), {
            name: menuData.name,
            description: menuData.description,
            imageUrl: menuData.image,
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch(error){
        console.log("Error can not create a new menu");
    }
}

export const getAllMenus = async () => {
    try {
        const q = query(collection(firestore, "menus"));
        const querySnapshot = await getDocs(q);

        const menus = [];
        querySnapshot.forEach((doc) => {
            menus.push({id: doc.id, ...doc.data()});
        });

        return menus;
    }catch(error){
        console.log(error);
    }
}
