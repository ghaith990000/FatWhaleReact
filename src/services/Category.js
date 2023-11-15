import {firestore} from "../firebase";
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion} from "firebase/firestore";

const collectionName = 'menus';

const generateCategoryId= () => {
    return doc(collection(firestore, collectionName)).id;
};

export const addCategoryToMenu = async(menuId, categoryData) => {
    try {
        const menuDocRef = doc(firestore, collectionName, menuId);

        // Generate a unique category ID
        const categoryId = generateCategoryId();


        // Add the new category to the 'categories' array using arrayUnion
        await updateDoc(menuDocRef,{
            [`categories.${categoryId}`]: {
                name: categoryData.name,
                description: categoryData.description,
                image: categoryData.image,
            },
        });

        console.log("Category added to the menu successfully.");
    }catch(error){
        console.log("Error adding category to the menu: ", error);
    }
}