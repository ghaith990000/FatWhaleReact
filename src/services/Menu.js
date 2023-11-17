import {firestore} from "../firebase";
import { collection, addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";
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
        console.log("Error in Menu Ghaith", error);
    }
}

export const getMenu = async (id) => {
    try {
        const docRef = doc(firestore, "menus", id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            const menuData = {id: docSnap.id, ...docSnap.data()};
            console.log("Document data: ", docSnap.data());
            return menuData;
        }else {
            console.log("No such document!");
            return null;
        }

    }catch(error){
        console.log(error);
        return null;
    }
}

